import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
import RNPaystack from 'react-native-paystack'
import Auth from '../services/auth'
import { UpsertSaleOrder } from '../graphql/mutations/order'
import { ListCompanySalesGQL } from '../graphql/queries/order'
import { CompanyCustomersGQL } from '../graphql/queries/contact'
import { parseFieldErrors } from '../Functions'

interface IProps {
  navigation: any
}

interface ISalesInput {
  productId?: string
  quantity: String
  name?: string
  type?: string
  serviceId?: String
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
  discount: string
  amountPaid: string
  salesOrderId: string
  hasSalesOrderBeenCreated: boolean
  tax: string
  cardDetails: any
  user: { userId?: string; companyId?: string }
}

export default class UpsertSalesOrderScreen extends React.PureComponent<
  IProps,
  IState
> {
  static navigationOptions = {
    header: null
  }

  state = {
    items: [
      {
        productId: null,
        quantity: '',
        name: '',
        type: '',
        serviceId: null,
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
    loading: false,
    salesOrderId: '',
    hasSalesOrderBeenCreated: false,
    cardDetails: null,
    user: { companyId: '', userId: '' }
  }

  async componentDidMount() {
    let {
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

  onCompleted = async res => {
    const {
      upsertSaleOrder: { success, fieldErrors, data }
    } = res

    if (success) {
      let { id } = data

      this.setState(
        {
          salesOrderId: id,
          hasSalesOrderBeenCreated: true
        },
        () => {
          this.state.paymentMethod.toLowerCase() == 'cash'
            ? this.props.navigation.navigate('Sales')
            : this.chargeCard()
        }
      )
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }

  chargeCard = async () => {
    let { cardDetails, amountPaid } = this.state,
      _cardDetails = cardDetails || {},
      { valid } = _cardDetails

    if (valid) {
      let {
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
          this.props.navigation.navigate('Sales')
        })
        .catch(error => {
          //@Todo: handle error better
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

    let items = this.state.items.map(item => {
      let param = { ...item }
      delete param.type
      delete param.name

      if (!param.productId) delete param.productId
      if (!param.serviceId) delete param.serviceId
      return param
    })

    let {
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

    delete _params.cardDetails
    delete _params.fieldErrors
    delete _params.existingContact
    delete _params.isCustomerInContacts
    delete _params.user
    delete _params.salesOrderId
    delete _params.hasSalesOrderBeenCreated
    delete _params.loading
    delete _params.email
    delete _params.contactName

    return saleId
      ? {
          sale: _params,
          saleId
        }
      : { sale: _params }
  }

  render() {
    let {
      isCustomerInContacts,
      user: { companyId },
      hasSalesOrderBeenCreated
    } = this.state

    return (
      <Mutation
        mutation={UpsertSaleOrder}
        refetchQueries={[
          {
            query: ListCompanySalesGQL,
            variables: {
              companyId: companyId,
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
              onCompleteSteps={() =>
                !hasSalesOrderBeenCreated
                  ? upsertSales({
                      variables: this.parseMutationVariables()
                    })
                  : this.chargeCard()
              }
              steps={[
                {
                  stepTitle: 'Lets have the items that are being ordered',
                  formFields: [
                    {
                      label: '',
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
                      type: {
                        type: 'radio',
                        options: ['No', 'Yes']
                      },
                      name: 'isCustomerInContacts'
                    },
                    isCustomerInContacts == 'No' && {
                      label: 'Customer name?',
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
                          type: {
                            type: 'search-picker',
                            searchQuery: CompanyCustomersGQL,
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
                      type: {
                        type: 'radio',
                        options: ['Card', 'Cash']
                      },
                      name: 'paymentMethod'
                    },
                    {
                      label: 'How much(N) was actually paid?',
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
                      underneathText: 'Ignore if there are no discounts.'
                    },
                    {
                      label: 'Tax on this payment(%)',
                      type: {
                        type: 'input',
                        keyboardType: 'numeric'
                      },
                      placeholder: '0.00',
                      name: 'tax',
                      underneathText:
                        'Ignore if there are no taxes on this payment'
                    }
                  ],
                  buttonTitle:
                    this.state.paymentMethod.toLowerCase() != 'cash'
                      ? 'Next'
                      : 'Done'
                },
                this.state.paymentMethod.toLowerCase() == 'card' && {
                  stepTitle: 'Lets sort out the payment for this order',
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
