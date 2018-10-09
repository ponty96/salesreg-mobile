import React from 'react'
import { Mutation } from 'react-apollo'
import { LoginUserMutationGQL } from '../graphql/mutations/authenticate'
import { AuthenticateClientGQL } from '../graphql/client-mutations/authenticate'
import Auth from '../services/auth'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import AuthFormContainer from '../Container/AuthFormContainer'
import InputAtom from '../Atom/InputAtom'

interface IProps {
  navigation: any
  screenProps: any
  login: any
}

interface IState {
  fieldErrors: any
  email: string
  password: string
  isEdited: boolean
}

class LoginScreen extends React.Component<IProps, IState> {
  state = {
    fieldErrors: null,
    email: '',
    password: '',
    isEdited: false
  }
  componentDidMount() {
    Auth.clearVault()
  }

  getEmail = (email: any) => {
    this.setState({
      email
    })
  }

  getPassword = (pass: any) => {
    this.setState({
      password: pass
    })
  }
  render() {
    const { fieldErrors } = this.state
    return (
      <Mutation mutation={LoginUserMutationGQL} onCompleted={this.onCompleted}>
        {(loginUser, { loading }) => (
          <AuthFormContainer
            pageTitle="Login to your account"
            actionButtonText="Login"
            showActionButtonIcon={true}
            onPressActionButton={() =>
              loginUser({
                variables: {
                  email: this.state.email,
                  password: this.state.password
                }
              })
            }
            alternativeLinkText="Forgot Password"
            alternativeLinkRoute="ForgotPassword"
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
            />

            <InputAtom
              label="And your Password"
              getValue={this.getPassword}
              secureTextEntry={true}
              underneathText="Must be at least 6 characters"
              login={true}
              error={fieldErrors && fieldErrors.password}
              placeholder="your secret password"
              defaultValue={this.state.password}
            />
          </AuthFormContainer>
        )}
      </Mutation>
    )
  }
  onCompleted = async res => {
    console.log('LOGINSCREEN', res)
    const {
      loginUser: { data, fieldErrors, success }
    } = res
    if (success) {
      const {
        screenProps: { client }
      } = this.props

      const { accessToken, refreshToken, user } = data

      await Auth.clearVault()
      await Auth.setToken(accessToken)
      await Auth.setRefreshToken(refreshToken)
      await Auth.setCurrentUser(user)
      await client.resetStore()
      client.mutate({
        mutation: AuthenticateClientGQL,
        variables: { user: user }
      })
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}
export default LoginScreen
