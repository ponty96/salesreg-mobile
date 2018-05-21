import React, { PureComponent } from 'react'
import { Text, View, KeyboardAvoidingView } from 'react-native'

import styles from './../Style/Auth'
import ResetForm from '../Components/ResetForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'

interface IProps {
  navigation: any
}

interface IState {}

class ResetScreen extends PureComponent<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <View style={styles.wrapper}>
          <Text style={styles.signUpText}>RESET PASSWORD</Text>
          <KeyboardAvoidingView behavior="position">
            <ResetForm navigation={this.props.navigation} secretPhone={''}/>
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }
}

export default ResetScreen
