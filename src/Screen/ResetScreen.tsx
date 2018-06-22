import React, { PureComponent } from 'react'
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

import ResetForm from '../Components/ResetForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

class ResetScreen extends PureComponent<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200}>
          <ScrollView style={styles.wrapper}>
            <Text style={[styles.signUpText, { fontFamily: 'SourceSansPro' }]}>
              RESET PASSWORD
            </Text>
            <ResetForm navigation={this.props.navigation} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default ResetScreen

const styles = StyleSheet.create({
  signUpText: {
    color: color.button,
    marginTop: 32,
    alignSelf: 'center'
  },
  wrapper: {
    paddingHorizontal: 32
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
