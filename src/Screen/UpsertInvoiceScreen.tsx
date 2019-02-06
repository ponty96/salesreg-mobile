import React from 'react'
import { Alert, Platform } from 'react-native'
import FormStepperContainer from '../Container/Form/StepperContainer'
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
import { NotificationBanner } from '../Components/NotificationBanner'
import configureNotificationBanner from '../Functions/configureNotificationBanner'
import setAppAnalytics from '../Functions/setAppAnalytics'
import CardPaymentAtom from '../Atom/CardPaymentAtom'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  user: { userId?: string; companyId?: string }
  paymentMethod: string
  fieldErrors: any
  cardDetails: any
  amountPaid: string
  isCardPaymentVisible: boolean
}

class UpsertInvoiceScreen extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    user: { companyId: '', userId: '' },
    paymentMethod: '',
    fieldErrors: {},
    cardDetails: null,
    amountPaid: '',
    isCardPaymentVisible: false
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
    this.setState({
      isCardPaymentVisible: true
    })
  }

  navigateUser = () => {
    const {
      navigation: {
        state: {
          params: { sales, from }
        }
      }
    } = this.props

    setAppAnalytics('MAKE_INVOICE_PAYMENT', this.state)
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

    let banner = NotificationBanner(
      configureNotificationBanner('MakeInvoicePayment', this.state.amountPaid)
    )
    banner.show({ bannerPosition: 'bottom' })

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
        navigation: {
          state: {
            params: {
              sales: {
                id,
                contact: { email, contactName }
              }
            }
          }
        }
      } = this.props,
      { amountPaid } = this.state,
      _firstname = contactName.split(' ')[1],
      _lastname = contactName.split(' ')[0]

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
              <AppSpinner visible={loading} />
              <CardPaymentAtom
                visible={this.state.isCardPaymentVisible}
                amount={amountPaid}
                email={email}
                firstname={_firstname}
                lastname={_lastname}
                saleId={id}
                onSuccess={this.handleCardSuccess}
                onError={this.handleCardError}
                onClose={() => this.setState({ isCardPaymentVisible: false })}
              />
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
    {({ user }) => <UpsertInvoiceScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpsertInvoiceScreen.navigationOptions = UpsertInvoiceScreen.navigationOptions

export default _UpsertInvoiceScreen
