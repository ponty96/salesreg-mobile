import React from 'react'
import { Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { ForgotPasswordMutationGQL } from '../graphql/mutations/authenticate'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import AuthFormContainer from '../Container/AuthFormContainer'
import InputAtom from '../Atom/Form/InputAtom'

interface IProps {
  navigation: any
  screenProps: any
}

interface IState {
  fieldErrors: any
  email: string
}

export default class ForgotPasswordScreen extends React.Component<
  IProps,
  IState
> {
  state = {
    fieldErrors: null,
    email: ''
  }

  getEmail = (email: any) => {
    let emailTest = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(email.trim())
    this.setState({
      email,
      fieldErrors: {
        ...this.state.fieldErrors,
        email: !emailTest ? 'Pleae enter a valid email address' : ''
      }
    })
  }

  validateReset = resetPassword => {
    let emailTest = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(this.state.email.trim())
    if (emailTest) {
      resetPassword({
        variables: {
          email: this.state.email
        }
      })
    } else if (!emailTest) {
      this.setState({
        fieldErrors: { email: 'Invalid email format' }
      })
    }
  }

  render() {
    const { fieldErrors } = this.state
    return (
      <Mutation
        mutation={ForgotPasswordMutationGQL}
        onCompleted={this.onCompleted}
      >
        {(resetPassword, { loading }) => (
          <AuthFormContainer
            pageTitle="Forgot your Password?"
            actionButtonText="Reset Password"
            alternativeLinkText="Login"
            alternativeLinkRoute="Login"
            showActionButtonIcon={true}
            onPressActionButton={() => this.validateReset(resetPassword)}
            footerText="No account yet?"
            footerButtonText="Sign up instead"
            footerButtonRoute="Signup"
            navigate={this.props.navigation.navigate}
          >
            <AppSpinner visible={loading} />
            <InputAtom
              label="Enter your Email"
              getValue={this.getEmail}
              login={true}
              error={fieldErrors && fieldErrors.email}
              placeholder="e.g lagbaja@example.com"
              defaultValue={this.state.email}
              keyboardType="email-address"
              underneathText="A reset email will be sent to this email address, please check your mail and follow the instructions provided to change your password."
            />
          </AuthFormContainer>
        )}
      </Mutation>
    )
  }

  onCompleted = async res => {
    const {
      forgotPassword: { fieldErrors, success }
    } = res
    if (success) {
      Alert.alert(
        'Email Sent Successfully!!',
        'A reset email has been sent to your email address, please check your mail and follow the instructions provided to change your password.',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Login')
          }
        ],
        { cancelable: false }
      )
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}
