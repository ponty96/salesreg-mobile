import React from 'react'
import { Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import FormStepperContainer from '../../Container/Form/StepperContainer'
import AppSpinner from '../../Components/Spinner'
import Auth from '../../services/auth'
import { CreateRecipt } from '../../graphql/mutations/order'
import {
  ListCompanySalesGQL,
  ListCompanyInvoicesGQL
} from '../../graphql/queries/order'
import { UserContext } from '../../context/UserContext'
import { parseFieldErrors } from '../../Functions'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import setAppAnalytics from '../../Functions/setAppAnalytics'

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
      makePayment({
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
              <AppSpinner visible={loading} />
              <FormStepperContainer
                fieldErrors={this.state.fieldErrors}
                handleBackPress={() => this.props.navigation.goBack()}
                formData={this.state}
                updateValueChange={this.updateState}
                onCompleteSteps={() => this.checkInvoiceValidity(makePayment)}
                steps={[
                  {
                    stepTitle: 'Payment',
                    formFields: [
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
