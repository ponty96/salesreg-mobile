import React from 'react'
// import { RegisterCompanyMutationGQL } from '../graphql/mutations/authenticate'
// import { Mutation } from 'react-apollo'
// import { parseFieldErrors } from '../Functions'
// import AppSpinner from '../Components/Spinner'
// import SignUpProcessContainer from '../Container/SignUpProcessContainer'
import FirstStep from '../../Components/SignUp/FirstStep'
import FormStepperContainer from '../../Container/Form/StepperContainer'

interface IProps {
  navigation: any
}

interface IState {
  email: string
  firstName: string
  lastName: string
  gender: string
  password: string
  passwordConfirmation: string
  currentStep: number
  fieldErrors: any
}

export default class UserOnboardScreen extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
    gender: '',
    currentStep: 0,
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
    const { currentStep } = this.state
    switch (currentStep) {
      case 0:
      default:
        return <FirstStep onCtaPress={() => this.navigateToStep(1)} />
      case 1:
        return (
          <FormStepperContainer
            formData={this.state}
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
                stepTitle: `Finally, lets make sure no one accesses your account without your permission`,
                formFields: [
                  {
                    label: 'Your email is also important',
                    placeholder: 'E.g someone@example.com',
                    type: {
                      type: 'input',
                      options: ['male', 'female'],
                      keyboardType: 'email-address'
                    },
                    name: 'email'
                  },
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
            updateValueChange={this.updateState}
            onCompleteSteps={() => this.handleReg()}
            handleBackPress={() => this.navigateToStep(0)}
            fieldErrors={this.state.fieldErrors}
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
    this.props.navigation.navigate('BusinessOnboard')
  }
}
