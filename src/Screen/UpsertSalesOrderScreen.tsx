import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
import RNPaystack from 'react-native-paystack'
import Auth from '../services/auth'
import { UpsertSaleOrder } from '../graphql/mutations/order'
import {
  ListCompanySalesGQL,
  ListCompanyInvoicesGQL
} from '../graphql/queries/order'
import { CompanyCustomersGQL } from '../graphql/queries/contact'
import { parseFieldErrors } from '../Functions'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../context/NotificationContext'
import configureNotificationBanner from '../Functions/configureNotificationBanner'
import { Alert, Text } from 'react-native'
import setAppAnalytics from '../Functions/setAppAnalytics'
import { color } from '../Style/Color'
import { Countries } from '../utilities/data/picker-lists'

interface IProps {
  navigation: any
  setNotificationBanner: (obj: any) => void
}

interface ISalesInput {
  productId?: string
  quantity: String
  name?: string
  unitPrice: String
}

interface IState {
  items: ISalesInput[]
  fieldErrors: any
  paymentMethod: string
  date: string
  loading: boolean
  existingContact: { id?: string; contactName?: string; email?: string }
  contactName: string
  email: string
  isCustomerInContacts: any
  data: any
  discount: string
  amountPaid: string
  salesOrderId: string
  hasSalesOrderBeenCreated: boolean
  tax: string
  street1: string
  city: string
  state: string
  country: string
  cardDetails: any
  user: { userId?: string; companyId?: string }
}

class UpsertSalesOrderScreen extends React.PureComponent<IProps, IState> {
  state = {
    items: [
      {
        productId: null,
        quantity: '',
        name: '',
        unitPrice: '0.00'
      }
    ],
    fieldErrors: null,
    isCustomerInContacts: null,
    paymentMethod: '',
    amountPaid: '0.00',
    date: new Date().toString(),
    discount: '0',
    existingContact: { id: '', contactName: '', email: '' },
    tax: '',
    contactName: '',
    email: '',
    street1: '',
    city: '',
    state: '',
    country: 'NG',
    data: {},
    loading: false,
    salesOrderId: '',
    hasSalesOrderBeenCreated: false,
    cardDetails: null,
    user: { companyId: '', userId: '' }
  }

  async componentDidMount() {
    const {
      company: { id: companyId },
      id: userId
    } = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      user: {
        companyId,
        userId
      }
    })
  }

  updateState = (key: string, val: any) => {
    const formData = {
      ...this.state,
      [key]: val
    }

    let total = 0

    if (key == 'items') {
      val.forEach(item => {
        total += Number(item.unitPrice) * Number(item.quantity)
      })
    }

    this.setState({
      ...formData,
      amountPaid:
        key == 'items'
          ? total.toString()
          : key == 'amountPaid'
          ? val
          : this.state.amountPaid
    })
  }

  navigateUser = () => {
    setAppAnalytics('CREATE_SALES_ORDER', this.state)
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Sales'
        }),
        NavigationActions.navigate({
          routeName: 'SalesDetails',
          params: { sales: this.state.data }
        })
      ]
    })
    this.props.setNotificationBanner(
      configureNotificationBanner('UpsertSalesOrder')
    )
    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = async res => {
    const {
      upsertSaleOrder: { success, fieldErrors, data }
    } = res

    if (success) {
      const { id } = data

      this.setState(
        {
          salesOrderId: id,
          data,
          hasSalesOrderBeenCreated: true
        },
        () => {
          this.state.paymentMethod.toLowerCase() == 'cash'
            ? this.navigateUser()
            : this.chargeCard()
        }
      )
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }

  chargeCard = async () => {
    const { cardDetails, amountPaid } = this.state,
      _cardDetails = cardDetails || {},
      { valid } = _cardDetails

    if (valid) {
      const {
        values: { number, expiry, cvc }
      } = _cardDetails

      this.setState({ loading: true })
      RNPaystack.chargeCard({
        cardNumber: number.replace(/\s/gi, ''),
        expiryMonth: expiry.split('/')[0],
        expiryYear: expiry.split('/')[1],
        cvc,
        email:
          this.state.isCustomerInContacts != 'No'
            ? this.state.existingContact.email
            : this.state.email,
        amountInKobo: Number(amountPaid) * 100,
        reference: `${this.state.salesOrderId}_${Date.now()}`
      })
        .then(() => {
          this.setState({ loading: false })
          this.navigateUser()
        })
        .catch(error => {
          console.log(error.message)
          this.setState({ loading: false })
        })
    } else {
      console.log('Card details entered is invalid')
    }
  }

  parseMutationVariables = () => {
    let contact = {}

    if (this.state.isCustomerInContacts == 'No') {
      contact = {
        ...this.state.user,
        contactName: this.state.contactName,
        email: this.state.email,
        type: 'customer'
      }
    }

    const items = this.state.items.map(item => {
      const param = { ...item }
      delete param.name

      if (!param.productId) delete param.productId
      return param
    })

    const {
        navigation: {
          state: { params }
        }
      } = this.props,
      _saleId = params && params.sales && params.sales.id,
      saleId = _saleId || null,
      _params = {
        ...this.state,
        contact,
        items,
        paymentMethod: this.state.paymentMethod.toUpperCase(),
        ...this.state.user
      }

    if (_params.isCustomerInContacts != 'No') {
      _params['contactId'] = _params.existingContact.id
      delete _params.contact
    }

    _params['location'] = {
      street1: this.state.street1,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country
    }

    delete _params.cardDetails
    delete _params.fieldErrors
    delete _params.existingContact
    delete _params.isCustomerInContacts
    delete _params.user
    delete _params.salesOrderId
    delete _params.hasSalesOrderBeenCreated
    delete _params.loading
    delete _params.email
    delete _params.data
    delete _params.contactName
    delete _params.street1
    delete _params.city
    delete _params.state
    delete _params.country

    return saleId
      ? {
          sale: _params,
          saleId
        }
      : { sale: _params }
  }

  checkSalesOrderValidity = upsertSales => {
    let { items, amountPaid, discount, hasSalesOrderBeenCreated } = this.state,
      totalAmount = 0
    items.forEach(sales => {
      totalAmount += Number(sales.quantity) * Number(sales.unitPrice)
    })
    let _amountPayable = totalAmount - Number(discount),
      amountPayable = _amountPayable || totalAmount

    if (Number(amountPaid) > amountPayable) {
      Alert.alert(
        'Cannot make payment',
        `You are paying too much than the actual amount payable for the sales order. Maximum amount payable is \u20A6${amountPayable}. Please review your order`,
        [{ text: 'Ok', onPress: () => null }],
        { cancelable: false }
      )
    } else if (Number(discount) > amountPayable) {
      Alert.alert(
        'Cannot make payment',
        `The discount cannot be more than the actual payable amount which is \u20A6${amountPayable}`,
        [{ text: 'Ok', onPress: () => null }],
        { cancelable: false }
      )
    } else {
      !hasSalesOrderBeenCreated
        ? upsertSales({
            variables: this.parseMutationVariables()
          })
        : this.chargeCard()
    }
  }

  render() {
    const {
      isCustomerInContacts,
      user: { companyId }
    } = this.state

    return (
      <Mutation
        mutation={UpsertSaleOrder}
        refetchQueries={[
          {
            query: ListCompanySalesGQL,
            variables: {
              companyId,
              first: 10,
              after: null
            }
          },
          {
            query: ListCompanyInvoicesGQL,
            variables: {
              companyId,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(upsertSales, { loading }) => (
          <React.Fragment>
            <AppSpinner visible={loading || this.state.loading} />
            <FormStepperContainer
              formData={this.state}
              updateValueChange={this.updateState}
              handleBackPress={() => this.props.navigation.goBack()}
              fieldErrors={this.state.fieldErrors}
              onCompleteSteps={() => this.checkSalesOrderValidity(upsertSales)}
              steps={[
                {
                  stepTitle: "Let's have the items that are being ordered",
                  formFields: [
                    {
                      label: '',
                      validators: ['sales-order'],
                      type: {
                        type: 'sales-order-items'
                      },
                      name: 'items'
                    }
                  ]
                },
                {
                  stepTitle: 'Who is making this order?',
                  formFields: [
                    {
                      label: 'Is this customer in your contacts?',
                      validators: ['required'],
                      type: {
                        type: 'radio',
                        options: ['No', 'Yes']
                      },
                      name: 'isCustomerInContacts'
                    },
                    isCustomerInContacts == 'No' && {
                      label: 'Customer name?',
                      validators: ['required'],
                      type: {
                        type: 'input'
                      },
                      placeholder: "Enter customer's name",
                      name: 'contactName',
                      underneathText:
                        'This customer will be added to your contacts. You can edit this contact through details.'
                    },
                    isCustomerInContacts == 'No'
                      ? {
                          label: 'Customer Email?',
                          validators: ['required', 'email'],
                          type: {
                            type: 'input',
                            keyboardType: 'email-address'
                          },
                          placeholder: "Enter customer's email",
                          name: 'email'
                        }
                      : isCustomerInContacts == 'Yes'
                      ? {
                          label: 'Customer',
                          validators: ['required'],
                          type: {
                            type: 'search-picker',
                            searchQuery: CompanyCustomersGQL,
                            emptySection: {
                              emptyText: (
                                <Text>
                                  You currently do not have any customers.{' '}
                                  {'\n'} To create a new customer,{' '}
                                  <Text style={{ color: color.button }}>
                                    go back > Select No for the ("Is this
                                    customer in your contacts?") question > Fill
                                    the appropriate fields
                                  </Text>
                                </Text>
                              )
                            },
                            searchQueryResponseKey: 'companyCustomers'
                          },
                          name: 'existingContact',
                          placeholder: 'Touch to select customer'
                        }
                      : null
                  ]
                },
                {
                  stepTitle: 'Delivery Address',
                  formFields: [
                    {
                      label: 'Street',
                      placeholder: '123 Street',
                      validators: ['required'],
                      name: 'street1',
                      type: {
                        type: 'input'
                      }
                    },
                    {
                      label: 'City',
                      validators: ['required'],
                      placeholder: 'City name',
                      name: 'city',
                      type: {
                        type: 'input'
                      }
                    },
                    {
                      label: 'State',
                      placeholder: 'State name',
                      validators: ['required'],
                      name: 'state',
                      type: {
                        type: 'input'
                      }
                    },
                    {
                      label: 'Country',
                      validators: ['required'],
                      placeholder: 'Touch to choose',
                      type: {
                        type: 'picker',
                        options: Countries
                      },
                      name: 'country'
                    }
                  ]
                },
                {
                  stepTitle: 'Payment Method',
                  formFields: [
                    {
                      label: 'How is this customer paying?',
                      validators: ['required'],
                      type: {
                        type: 'radio',
                        options: ['Card', 'Cash']
                      },
                      name: 'paymentMethod'
                    },
                    {
                      label: 'How much(N) was actually paid?',
                      validators: ['required'],
                      type: {
                        type: 'input',
                        keyboardType: 'numeric'
                      },
                      placeholder: '0.00',
                      name: 'amountPaid'
                    },
                    {
                      label: 'Are you giving discounts?',
                      type: {
                        type: 'input',
                        keyboardType: 'numeric'
                      },
                      placeholder: '0',
                      name: 'discount',
                      underneathText:
                        'Discounts should be based on the amount given not the percentage. Ignore if there are no discounts.'
                    }
                  ],
                  buttonTitle:
                    this.state.paymentMethod.toLowerCase() != 'cash'
                      ? 'Next'
                      : 'Done'
                },
                this.state.paymentMethod.toLowerCase() == 'card' && {
                  stepTitle: "Let's sort out the payment for this order",
                  formFields: [
                    {
                      label: '',
                      type: {
                        type: 'card-payment'
                      },
                      name: 'cardDetails'
                    }
                  ],
                  buttonTitle: 'Done'
                }
              ]}
            />
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}

const _UpsertSalesOrderScreen: any = props => (
  <NotificationContext.Consumer>
    {({ setNotificationBanner }) => (
      <UpsertSalesOrderScreen
        {...props}
        setNotificationBanner={setNotificationBanner}
      />
    )}
  </NotificationContext.Consumer>
)

_UpsertSalesOrderScreen.navigationOptions = {
  header: null
}

export default _UpsertSalesOrderScreen
