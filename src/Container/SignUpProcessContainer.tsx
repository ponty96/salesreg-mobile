import React from 'react'
import FirstStep from '../Components/SignUp/FirstStep'
import ThirdStep from '../Components/SignUp/ThirdStep'
import LastStep from '../Components/SignUp/LastStep'
import FormStepperContainer from '../Container/Form/StepperContainer'

interface IState {
  currentStep: number
}

interface IProps {
  registerUser: () => void
  updateValueChange: (key, value) => void
  formData: any
  firstName: string
}
export default class SignUpProcessContainer extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    currentStep: 0
  }
  render() {
    return this.renderComponentAtStep()
  }

  navigateToStep = step => {
    this.setState({ currentStep: step })
  }
  renderComponentAtStep = (): JSX.Element => {
    const { currentStep } = this.state
    switch (currentStep) {
      case 0:
      default:
        return <FirstStep onCtaPress={() => this.navigateToStep(1)} />
      case 1:
        return (
          <FormStepperContainer
            formData={this.props.formData}
            steps={[
              {
                stepTitle: 'Tell us a little about yourself',
                formFields: [
                  {
                    label: 'Whats your first name?',
                    placeholder: 'E.g John',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    name: 'firstName'
                  },
                  {
                    label: 'Whats your last name?',
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    name: 'lastName'
                  },
                  {
                    label: 'Are you male or female?',
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'radio',
                      options: ['male', 'female']
                    },
                    name: 'gender'
                  }
                ]
              },
              {
                stepTitle: `Welcome ${
                  this.props.firstName
                }. How can customers contact you`,
                formFields: [
                  {
                    label: 'What country are you in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'country-picker'
                    },
                    name: 'country'
                  },
                  {
                    label: 'Whats about your phone number?',
                    type: {
                      type: 'phone-input'
                    },
                    name: 'phone',
                    extraData: {
                      countryCode: this.props.formData['country']
                    }
                  },
                  {
                    label: 'Your email is also important',
                    placeholder: 'E.g someone@example.com',
                    type: {
                      type: 'input',
                      options: ['male', 'female'],
                      keyboardType: 'email-address'
                    },
                    name: 'email'
                  }
                ]
              },
              {
                stepTitle: `Finally, lets make sure no one accesses your account without your permission`,
                formFields: [
                  {
                    label: 'Enter a password',
                    placeholder: 'Something only you know',
                    type: {
                      type: 'input',
                      keyboardType: 'default',
                      secureTextEntry: true
                    },
                    name: 'password',
                    underneathText: 'Not less than 8 character long'
                  },
                  {
                    label: 'Re-enter password just to be sure',
                    placeholder: 'Same thing you entered above',
                    type: {
                      type: 'input',
                      keyboardType: 'default',
                      secureTextEntry: true
                    },
                    name: 'passwordConfirmation'
                  }
                ]
              }
            ]}
            updateValueChange={this.props.updateValueChange}
            onCompleteSteps={() => this.navigateToStep(2)}
          />
        )
      case 2:
        return (
          <ThirdStep
            onCtaPress={() => this.navigateToStep(3)}
            firstName="Opeoluwa"
          />
        )
      case 3:
        return (
          <LastStep
            onCtaPress={() => this.props.registerUser()}
            businessName="MayAfriq"
          />
        )
    }
  }
}
