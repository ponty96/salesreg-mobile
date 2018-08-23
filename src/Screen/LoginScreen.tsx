import React from 'react'
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from 'react-native'

import LoginForm from '../Components/LoginForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import { color } from '../Style/Color'
import { Mutation } from 'react-apollo'
import { LoginUserMutationGQL } from '../graphql/mutations/authenticate'
import { AuthenticateClientGQL } from '../graphql/client-mutations/authenticate'
import Auth from '../services/auth'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'

interface IProps {
  navigation: any
  screenProps: any
  login: any
}

interface IState {
  fieldErrors: any
}

class LoginScreen extends React.Component<IProps, IState> {
  state = {
    fieldErrors: null
  }
  componentDidMount() {
    Auth.clearVault()
  }
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={[styles.signUpText, { fontFamily: 'SourceSansPro' }]}>
              LOGIN
            </Text>
            <Mutation
              mutation={LoginUserMutationGQL}
              onCompleted={this.onCompleted}
            >
              {(loginUser, { loading }) => (
                <KeyboardAvoidingView
                  behavior="padding"
                  keyboardVerticalOffset={160}
                >
                  <AppSpinner visible={loading} />
                  <LoginForm
                    navigation={this.props.navigation}
                    loading={loading}
                    fieldErrors={this.state.fieldErrors}
                    onSubmit={params =>
                      loginUser({
                        variables: {
                          ...params
                        }
                      })
                    }
                  />
                </KeyboardAvoidingView>
              )}
            </Mutation>
          </View>
        </ScrollView>
      </View>
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
      client.mutate({ mutation: AuthenticateClientGQL })
      this.props.navigation.navigate('Home')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  signUpText: {
    color: color.button,
    alignSelf: 'center',
    fontSize: 16
  },
  wrapper: {
    paddingHorizontal: 32,
    marginTop: 32
  }
})