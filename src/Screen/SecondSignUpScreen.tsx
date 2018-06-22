import React, { PureComponent } from 'react'
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'

import SecondSignUpForm from '../Components/SecondSignUpForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import TransitionAtom from '../Atom/TransitionAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class Signup2Screen extends PureComponent<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <TransitionAtom />
            <Text
              style={[styles.personalInfoText, { fontFamily: 'SourceSansPro' }]}
            >
              BUSINESS INFORMATION
            </Text>
            <KeyboardAvoidingView behavior={'padding'}>
              <SecondSignUpForm navigation={this.props.navigation} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Signup2Screen

const styles = StyleSheet.create({
  personalInfoText: {
    marginTop: 10,
    color: color.button,
    textAlign: 'center'
  },
  wrapper: {
    paddingHorizontal: 32,
    paddingVertical: 10
  },
  signUpText: {
    color: color.button,
    marginTop: 32,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
