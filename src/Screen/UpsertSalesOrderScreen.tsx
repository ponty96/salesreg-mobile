import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
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
import { Alert, Text, Platform } from 'react-native'
import setAppAnalytics from '../Functions/setAppAnalytics'
import { color } from '../Style/Color'
import CardPaymentAtom from '../Atom/CardPaymentAtom'

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
  user: { userId?: string; companyId?: string }
  isCardPaymentVisible: boolean
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
    data: {},
    salesOrderId: '',
    hasSalesOrderBeenCreated: false,
    isCardPaymentVisible: false,
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
    this.setState({
      isCardPaymentVisible: true
    })
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

    delete _params.fieldErrors
    delete _params.existingContact
    delete _params.isCustomerInContacts
    delete _params.user
    delete _params.salesOrderId
    delete _params.hasSalesOrderBeenCreated
    delete _params.email
    delete _params.data
    delete _params.contactName
    delete _params.isCardPaymentVisible

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

  handleCardSuccess = () => {
    Platform.OS == 'android'
      ? this.setState(
          {
            isCardPaymentVisible: false
          },
          this.navigateUser
        )
      : Alert.alert(
          'Payment Successful',
          `A sum of ${this.state.amountPaid} was made successfully`,
          [
            {
              text: 'Ok',
              onPress: () => {
                this.setState(
                  {
                    isCardPaymentVisible: false
                  },
                  this.navigateUser
                )
              }
            }
          ],
          { cancelable: false }
        )
  }

  handleCardError = e => {
    Alert.alert(
      'Cannot make payment',
      `${e}`,
      [{ text: 'Ok', onPress: () => null }],
      { cancelable: false }
    )
  }

  render() {
    const {
        isCustomerInContacts,
        user: { companyId },
        amountPaid,
        existingContact,
        email,
        contactName,
        salesOrderId
      } = this.state,
      _email = isCustomerInContacts != 'No' ? existingContact.email : email,
      _firstname =
        isCustomerInContacts != 'No'
          ? existingContact.contactName.split(' ')[1]
          : contactName.split(' ')[1],
      _lastname =
        isCustomerInContacts != 'No'
          ? existingContact.contactName.split(' ')[0]
          : contactName.split(' ')[0]

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
            <AppSpinner visible={loading} />
            <CardPaymentAtom
              visible={this.state.isCardPaymentVisible}
              amount={amountPaid}
              email={_email}
              firstname={_firstname}
              lastname={_lastname}
              saleId={salesOrderId}
              onSuccess={this.handleCardSuccess}
              onError={this.handleCardError}
              onClose={() => this.setState({ isCardPaymentVisible: false })}
            />
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
