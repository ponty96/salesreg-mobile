import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import RNPaystack from 'react-native-paystack'
import AppSpinner from '../Components/Spinner'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  user: { userId?: string; companyId?: string }
  loading: boolean
  paymentMethod: string
  fieldErrors: any
  cardDetails: any
  amountPaid: string
}

export default class UpsertInvoiceScreen extends React.PureComponent<
  IProps,
  IState
> {
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

    this.setState({
      ...formData
    })
  }

  chargeCard = async () => {
    let {
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
      let {
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

  render() {
    return (
      <React.Fragment>
        <AppSpinner visible={this.state.loading} />
        <FormStepperContainer
          fieldErrors={this.state.fieldErrors}
          handleBackPress={() => this.props.navigation.goBack()}
          formData={this.state}
          updateValueChange={this.updateState}
          onCompleteSteps={this.chargeCard}
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
    )
  }
}
