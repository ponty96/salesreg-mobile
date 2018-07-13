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
import Signup2Screen from './SecondSignUpScreen'

interface IProps {
  navigation: any
}

interface IState {
  showSecondScreen: boolean
}

class SignupScreen extends PureComponent<IProps, IState> {
  state = {
    showSecondScreen: false
  }
  onPress = () => {
    this.setState({ showSecondScreen: true })
  }
  render() {
    if (this.state.showSecondScreen) {
      return <Signup2Screen navigation={this.props.navigation} />
    }
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
              <SignupForm
                navigation={this.props.navigation}
                onPress={this.onPress}
              />
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
    marginTop: 10,
    color: color.button,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5
  },
  wrapper: {
    paddingHorizontal: 32
  },
  signUpText: {
    color: color.button,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
