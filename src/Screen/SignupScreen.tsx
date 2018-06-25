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

class SignupScreen extends PureComponent<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={[styles.signUpText, { fontFamily: 'SourceSansPro' }]}>
              SIGN UP
            </Text>
            <TransitionAtom firstScreen={true} />
            <Text
              style={[styles.personalInfoText, { fontFamily: 'SourceSansPro' }]}
            >
              PERSONAL INFORMATION
            </Text>
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
    marginTop: 16,
    color: color.button,
    textAlign: 'center',
    fontSize: 14
  },
  wrapper: {
    paddingHorizontal: 32
    // marginTop: 16
  },
  signUpText: {
    color: color.button,
    marginTop: 20,
    marginBottom: 28,
    alignSelf: 'center',
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
