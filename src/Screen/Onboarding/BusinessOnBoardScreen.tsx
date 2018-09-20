import React from 'react'
// import { RegisterCompanyMutationGQL } from '../graphql/mutations/authenticate'
// import { Mutation } from 'react-apollo'
// import { parseFieldErrors } from '../Functions'
// import AppSpinner from '../Components/Spinner'
// import SignUpProcessContainer from '../Container/SignUpProcessContainer'
import ThirdStep from '../../Components/SignUp/ThirdStep'
import LastStep from '../../Components/SignUp/LastStep'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Countries, Currencies } from '../../utilities/data/picker-lists'

interface IProps {
  navigation: any
}

interface IState {
  currentStep: number
  businessName: string
  businessEmail: string
  businessPhone: string
  businessCountry: string
  currency: string
  description: string
  logo: string[]
  fieldErrors: any
}

export default class BusinessOnboardScreen extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    currentStep: 0,
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessCountry: '',
    currency: '',
    description: '',
    logo: [],
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  render() {
    return this.renderComponentAtStep()
  }

  navigateToStep = step => {
    this.setState({ currentStep: step })
  }

  renderComponentAtStep = (): JSX.Element => {
    const firstName = this.props.navigation.getParam('firstName', '')
    const { currentStep } = this.state
    switch (currentStep) {
      case 0:
      default:
        return (
          <ThirdStep
            onCtaPress={() => this.navigateToStep(1)}
            firstName={firstName}
          />
        )
      case 1:
        return (
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: 'Tell us about your business',
                formFields: [
                  {
                    label: 'Whats your business name?',
                    placeholder: 'E.g Lidstack',
                    underneathText: `This name will appear on your webstore,\nheader, invoice, receipts, and notifications \nsent to your customers.`,
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    name: 'businessName'
                  },
                  {
                    label: 'Any nice description of your business?',
                    placeholder: 'E.g Write something nice',
                    underneathText: `Your business description will be displayed in\nthe ABOUT section of your Webstore, so your \nsite visitors can appreciate what you do.`,
                    type: {
                      type: 'input',
                      keyboardType: 'default',
                      multiline: true
                    },
                    name: 'description'
                  }
                ]
              },
              {
                stepTitle: 'Now your logo(optional).\n1MB or less',
                formFields: [
                  {
                    label: '',
                    name: 'logo',
                    type: {
                      type: 'image-upload'
                    },
                    underneathText:
                      'Your logo will appear on your webstore,\n invoice and receipts headers. If you have no \nlogo, your business name will only be used'
                  }
                ]
              },
              {
                stepTitle: `How can customers contact you`,
                formFields: [
                  {
                    label: 'What country are you in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Countries
                    },
                    name: 'businessCountry'
                  },
                  {
                    label: 'Whats about your phone number?',
                    type: {
                      type: 'phone-input'
                    },
                    name: 'businessPhone',
                    extraData: {
                      countryCode: this.state['businessCountry']
                    }
                  },
                  {
                    label: 'Your business email',
                    placeholder: `E.g ${this.state['firstName']}@${
                      this.state['businessName']
                    }.com`,
                    type: {
                      type: 'input',
                      options: ['male', 'female'],
                      keyboardType: 'email-address'
                    },
                    name: 'businessEmail'
                  }
                ]
              },
              {
                stepTitle: `Finally, lets make sure no one accesses your account without your permission`,
                formFields: [
                  {
                    label: 'What currency do you transact in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Currencies
                    },
                    name: 'currency'
                  }
                ],
                buttonTitle: 'Sign Up'
              }
            ]}
            updateValueChange={this.updateState}
            onCompleteSteps={() => this.handleReg()}
            handleBackPress={() => this.navigateToStep(0)}
            fieldErrors={this.state.fieldErrors}
          />
        )
      case 3:
        return (
          <LastStep
            onCtaPress={() => this.navigateToDashboard()}
            businessName="MayAfriq"
          />
        )
    }
  }

  handleReg = async () => {
    /***
     * Register User here
     * show successful sign up alert
     * run behind the scenes login code [navigate user to business onboard screen]
     *
     */
  }

  navigateToDashboard = () => {}
}
