import React from 'react'
import { Text, View, KeyboardAvoidingView, StyleSheet } from 'react-native'

import LoginForm from '../Components/LoginForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class LoginScreen extends React.Component<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <View style={styles.wrapper}>
          <Text style={styles.signUpText}>LOGIN</Text>
          <KeyboardAvoidingView behavior="position">
            <LoginForm navigation={this.props.navigation} />
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  signUpText: {
    color: color.primary,
    marginTop: 32,
    alignSelf: 'center'
  },
  wrapper: {
    paddingHorizontal: 32
  }
})
