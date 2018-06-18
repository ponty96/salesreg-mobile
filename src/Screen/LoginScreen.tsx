import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from 'react-native';

import LoginForm from '../Components/LoginForm';
import AuthenticationHeader from '../Components/AuthenticationHeader';
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
}

interface IState {}

class LoginScreen extends React.Component<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={styles.signUpText}>LOGIN</Text>
            <KeyboardAvoidingView behavior="position">
              <LoginForm navigation={this.props.navigation} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  signUpText: {
    color: color.button,
    marginTop: 32,
    alignSelf: 'center'
  },
  wrapper: {
    paddingHorizontal: 32
  }
});
