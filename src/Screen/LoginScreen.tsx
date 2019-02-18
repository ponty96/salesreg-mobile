import React from 'react'
import { Mutation } from 'react-apollo'
import { LoginUserMutationGQL } from '../graphql/mutations/authenticate'
import { AuthenticateClientGQL } from '../graphql/client-mutations/authenticate'
import Auth from '../services/auth'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import AuthFormContainer from '../Container/AuthFormContainer'
import InputAtom from '../Atom/Form/InputAtom'
import { UserContext } from '../context/UserContext'

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
    let emailTest = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(email.trim())
    this.setState({
      email,
      fieldErrors: {
        ...this.state.fieldErrors,
        email: !emailTest ? 'Pleae enter a valid email address' : ''
      }
    })
  }

  getPassword = (pass: any) => {
    this.setState({
      password: pass,
      fieldErrors: {
        ...this.state.fieldErrors,
        password: pass.trim().length == 0 ? 'Password cannot be empty' : ''
      }
    })
  }

  validateLogin = loginUser => {
    let emailTest = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(this.state.email.trim())
    if (emailTest && this.state.password.trim().length > 0) {
      loginUser({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
    } else if (!emailTest) {
      this.setState({
        fieldErrors: { email: 'Invalid email format' }
      })
    } else if (this.state.password.trim().length == 0) {
      this.setState({
        fieldErrors: { password: 'Password cannot be empty' }
      })
    }
  }

  render() {
    const { fieldErrors } = this.state
    return (
      <UserContext.Consumer>
        {({ resetUserContext, resetGettingStartedProgress }) => (
          <Mutation
            mutation={LoginUserMutationGQL}
            onCompleted={res =>
              this.onCompleted(
                res,
                resetUserContext,
                resetGettingStartedProgress
              )
            }
          >
            {(loginUser, { loading }) => (
              <AuthFormContainer
                pageTitle="Login to your account"
                actionButtonText="Login"
                showActionButtonIcon={true}
                onPressActionButton={() => this.validateLogin(loginUser)}
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
        )}
      </UserContext.Consumer>
    )
  }
  onCompleted = async (res, resetUserContext, resetGettingStartedProgress) => {
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

      let _stage = 'done'
      if (user.company && !user.company.instagram) {
        _stage = '1'
      } else if (user.company && !user.company.coverPhoto) {
        _stage = '2'
      } else if (
        user.company &&
        (!user.company.bank || !user.company.bank.subaccountId)
      ) {
        _stage = '3'
      }

      resetGettingStartedProgress(_stage)
      resetUserContext(user)

      await Auth.setGettingStartedProgress(_stage)
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
