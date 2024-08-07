import React from 'react'
import { Mutation } from 'react-apollo'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'

import FormStepperContainer from '../../Container/Form/StepperContainer'
import AppSpinner from '../../Components/Spinner'
import Auth from '../../services/auth'
import { UpsertSaleOrder } from '../../graphql/mutations/order'
import {
  ListCompanySalesGQL,
  ListCompanyInvoicesGQL
} from '../../graphql/queries/order'
import { CompanyCustomersGQL } from '../../graphql/queries/contact'
import { parseFieldErrors } from '../../Functions'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import setAppAnalytics from '../../Functions/setAppAnalytics'
import { color } from '../../Style/Color'
import { Countries } from '../../utilities/data/picker-lists'
import { UserContext } from '../../context/UserContext'
import { RegularText } from '../../Atom/TextAtom'
import { States } from '../../utilities/data/picker-lists'
import { SingleUserGQL } from '../../graphql/queries/Authenticate'

interface IProps {
  navigation: any
  screenProps: any
  user: any
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
  date: string
  existingContact: { id?: string; contactName?: string; email?: string }
  contactName: string
  email: string
  isCustomerInContacts: any
  data: any
  discount: string
  amountPaid: string
  salesOrderId: string
  tax: string
  region: string
  address: string
  state: string
  country: string
  deliveryFee: string
  companyRegions: any[]
  user: { userId?: string; companyId?: string }
  isCardPaymentVisible: boolean
}

class UpsertSalesOrderScreen extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    let sale = this.props.navigation.getParam('sales', null),
      newState = {}

    if (sale) {
      newState = {
        items: sale.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          name: item.product.name
        })),
        isCustomerInContacts: sale.contact ? 'Yes' : 'No',
        amountPaid: `${sale.amountPaid}`,
        date: moment(sale.date).format('YYYY-MM-DD'),
        discount: `${sale.discount}`,
        existingContact: {
          id: sale.contact.id,
          contactName: sale.contact.contactName,
          email: sale.contact.email
        },
        region: sale.location.city,
        address: sale.location.street1,
        state: sale.location.state,
        country: sale.location.country,
        deliveryFee: sale.deliveryFee
      }
    }

    this.state = {
      items: [
        {
          productId: null,
          quantity: '1',
          name: '',
          unitPrice: '0.00'
        }
      ],
      fieldErrors: null,
      isCustomerInContacts: null,
      amountPaid: '0.00',
      date: moment(new Date()).format('YYYY-MM-DD'),
      discount: '0',
      existingContact: { id: '', contactName: '', email: '' },
      tax: '',
      contactName: '',
      email: '',
      region: '',
      address: '',
      state: '',
      country: 'NG',
      data: {},
      salesOrderId: '',
      isCardPaymentVisible: false,
      user: { companyId: '', userId: '' },
      companyRegions: [],
      deliveryFee: '0.00',
      ...newState
    }
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

  updateState = async (key: string, val: any) => {
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

    await this.setState({
      ...formData,
      amountPaid:
        key == 'items'
          ? total.toString()
          : key == 'amountPaid'
          ? val
          : this.state.amountPaid
    })

    if (key === 'state') {
      this.getRegions()
    }

    if (key === 'region') {
      this.handleRegionSelection()
    }
  }

  getRegions = () => {
    const {
      screenProps: { client },
      user: { id }
    } = this.props

    client
      .query({
        query: SingleUserGQL,
        variables: { id },
        fetchPolicy: 'cache-only'
      })
      .then(result => {
        let {
            data: {
              singleUser: {
                company: { deliveryFees }
              }
            }
          } = result,
          { state } = this.state,
          nationwideFee = ''

        let companyRegions = deliveryFees.reduce((acc, value) => {
          value.state.toLowerCase() == 'nation wide' &&
            (nationwideFee = value.fee)

          if (value.state.toLowerCase() == state.toLowerCase()) {
            acc.push({
              ...value,
              mainLabel:
                value.region.toLowerCase() == 'all' ? 'Others' : value.region,
              value: value.region
            })
          }
          return acc
        }, [])

        companyRegions.length == 0 &&
          this.setState({
            deliveryFee: nationwideFee
          })

        this.setState({
          companyRegions
        })
      })
  }

  handleRegionSelection = () => {
    let deliveryFee = ''
    this.state.companyRegions.forEach(locations => {
      if (locations.region == this.state.region) {
        deliveryFee = locations.fee
      }
    })
    this.setState({
      deliveryFee
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

    const {
        navigation: {
          state: { params }
        }
      } = this.props,
      saleId = params && params.sales && params.sales.id

    let banner = NotificationBanner(
      configureNotificationBanner(
        saleId ? 'UpdateSaleOrder' : 'CreateSaleOrder'
      )
    )
    banner.show({ bannerPosition: 'bottom' })

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
          data
        },
        () => {
          this.navigateUser()
        }
      )
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
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
        ...this.state.user
      }

    if (_params.isCustomerInContacts != 'No') {
      _params['contactId'] = _params.existingContact.id
      delete _params.contact
    }

    _params['location'] = {
      state: this.state.state.trim().length > 0 ? this.state.state : 'Others',
      street1:
        this.state.address.trim().length > 0 ? this.state.address : 'Others',
      city: this.state.region.trim().length > 0 ? this.state.region : 'Others',
      country: this.state.country
    }

    delete _params.fieldErrors
    delete _params.existingContact
    delete _params.isCustomerInContacts
    delete _params.user
    delete _params.salesOrderId
    delete _params.email
    delete _params.data
    delete _params.contactName
    delete _params.isCardPaymentVisible
    delete _params.region
    delete _params.state
    delete _params.address
    delete _params.country
    delete _params.companyRegions

    return saleId
      ? {
          sale: _params,
          saleId
        }
      : { sale: _params }
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
            <AppSpinner visible={loading} />
            <FormStepperContainer
              formData={this.state}
              updateValueChange={this.updateState}
              handleBackPress={() => this.props.navigation.goBack()}
              fieldErrors={this.state.fieldErrors}
              onCompleteSteps={() =>
                upsertSales({
                  variables: this.parseMutationVariables()
                })
              }
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
                                <RegularText>
                                  You currently do not have any customers.{' '}
                                  {'\n'} To create a new customer,{' '}
                                  <RegularText style={{ color: color.button }}>
                                    go back > Select No for the ("Is this
                                    customer in your contacts?") question > Fill
                                    the appropriate fields
                                  </RegularText>
                                </RegularText>
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
                      label: 'Country',
                      validators: [],
                      placeholder: 'Touch to choose',
                      type: {
                        type: 'picker',
                        disabled: true,
                        options: Countries
                      },
                      name: 'country'
                    },
                    {
                      label: 'State',
                      placeholder: 'Touch to choose',
                      validators: [],
                      name: 'state',
                      type: {
                        type: 'picker',
                        options: States
                      }
                    },
                    this.state.companyRegions.length > 0 && {
                      label: 'Region',
                      placeholder: 'Touch to choose',
                      validators: [],
                      name: 'region',
                      type: {
                        type: 'picker',
                        options: this.state.companyRegions
                      }
                    },
                    {
                      label: 'Address',
                      placeholder: 'Address',
                      name: 'address',
                      type: {
                        type: 'input'
                      }
                    }
                  ]
                },
                {
                  stepTitle: 'Payment',
                  formFields: [
                    {
                      label: 'How much(N) is the delivery fee?',
                      validators: ['required'],
                      type: {
                        type: 'input',
                        keyboardType: 'numeric'
                      },
                      placeholder: '0.00',
                      name: 'deliveryFee'
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
  <UserContext.Consumer>
    {({ user }) => <UpsertSalesOrderScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpsertSalesOrderScreen.navigationOptions =
  UpsertSalesOrderScreen.navigationOptions

export default _UpsertSalesOrderScreen
