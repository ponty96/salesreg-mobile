import React from 'react'
import { Alert } from 'react-native'
import FormStepperContainer from '../Container/Form/StepperContainer'
import RNPaystack from 'react-native-paystack'
import AppSpinner from '../Components/Spinner'
import Auth from '../services/auth'
import { CreateRecipt } from '../graphql/mutations/order'
import { Mutation } from 'react-apollo'
import {
  ListCompanySalesGQL,
  ListCompanyInvoicesGQL
} from '../graphql/queries/order'
import { UserContext } from '../context/UserContext'
import { parseFieldErrors } from '../Functions'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../context/NotificationContext'
import configureNotificationBanner from '../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  user: { userId?: string; companyId?: string }
  loading: boolean
  paymentMethod: string
  fieldErrors: any
  cardDetails: any
  amountPaid: string
}

class UpsertInvoiceScreen extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    user: { companyId: '', userId: '' },
    loading: false,
    paymentMethod: '',
    fieldErrors: {},
    cardDetails: null,
    amountPaid: ''
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

    this.setState({
      ...formData
    })
  }

  chargeCard = async () => {
    const {
        navigation: {
          state: {
            params: {
              sales: {
                id,
                contact: { email }
              }
            }
          }
        }
      } = this.props,
      { cardDetails, amountPaid } = this.state,
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
        email,
        amountInKobo: Number(amountPaid) * 100,
        reference: `${id}_${Date.now()}`
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

  navigateUser = () => {
    const {
      navigation: {
        state: {
          params: { sales, from }
        }
      }
    } = this.props

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: from
        }),
        NavigationActions.navigate({
          routeName: 'InvoiceDetails',
          params: {
            sales: {
              ...sales,
              amountPaid: sales.amountPaid + Number(this.state.amountPaid)
            },
            from
          }
        })
      ]
    })
    this.props.setNotificationBanner(
      configureNotificationBanner('MakeInvoicePayment', this.state.amountPaid)
    )
    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = async res => {
    const {
      createReceipt: { success, fieldErrors }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.navigateUser()
    }
  }

  checkInvoiceValidity = (makePayment: (obj: any) => void) => {
    let amountPayable = this.props.navigation.getParam('amountPayable', null),
      { amountPaid } = this.state,
      {
        navigation: {
          state: {
            params: {
              sales: {
                invoice: { id }
              }
            }
          }
        }
      } = this.props

    if (Number(amountPaid) > amountPayable) {
      Alert.alert(
        'Cannot make payment',
        `You are paying too much than the actual amount payable for the sales order. Maximum amount payable is \u20A6${amountPayable}`,
        [{ text: 'Ok', onPress: () => null }],
        { cancelable: false }
      )
    } else {
      this.state.paymentMethod.toLowerCase() != 'cash'
        ? this.chargeCard()
        : makePayment({
            variables: {
              invoiceId: id,
              amountPaid: this.state.amountPaid
            }
          })
    }
  }

  render() {
    return (
      <Mutation
        mutation={CreateRecipt}
        refetchQueries={[
          {
            query: ListCompanySalesGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          },
          {
            query: ListCompanyInvoicesGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(makePayment, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={this.state.loading || loading} />
              <FormStepperContainer
                fieldErrors={this.state.fieldErrors}
                handleBackPress={() => this.props.navigation.goBack()}
                formData={this.state}
                updateValueChange={this.updateState}
                onCompleteSteps={() => this.checkInvoiceValidity(makePayment)}
                steps={[
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
          )
        }}
      </Mutation>
    )
  }
}

const _UpsertInvoiceScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <UpsertInvoiceScreen
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_UpsertInvoiceScreen.navigationOptions = UpsertInvoiceScreen.navigationOptions

export default _UpsertInvoiceScreen
