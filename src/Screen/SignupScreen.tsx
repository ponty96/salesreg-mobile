import React, { PureComponent } from 'react'
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'

import SignupForm from '../Components/SignupForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import TransitionAtom from '../Atom/TransitionAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class SignupScreen extends PureComponent<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={styles.signUpText}>SIGN UP</Text>
            <TransitionAtom screen1={true} />
            <Text style={styles.personalInfoText}>PERSONAL INFORMATION</Text>
            <KeyboardAvoidingView
              behavior={'padding'}
              keyboardVerticalOffset={95}
            >
              <SignupForm navigation={this.props.navigation} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default SignupScreen

const styles = StyleSheet.create({
  personalInfoText: {
    marginTop: '3%',
    color: color.primary,
    textAlign: 'center'
  },
  wrapper: {
    paddingHorizontal: 32
  },
  signUpText: {
    color: color.primary,
    marginTop: '4%',
    alignSelf: 'center',
    marginBottom: '3%'
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
