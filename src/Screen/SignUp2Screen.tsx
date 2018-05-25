import React, { PureComponent } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';

import styles from './../Style/Auth';
import SignupForm from '../Components/SignupForm';
import AuthenticationHeader from '../Components/AuthenticationHeader';

interface IProps {
  navigation: any;
}

interface IState {}

class Signup2Screen extends PureComponent<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={styles.signUpText}>SIGN UP</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  backgroundColor: 'red',
                  borderRadius: 20,
                  height: 20,
                  width: 20
                }}
              />
              <View
                style={{
                  borderBottomColor: 'red',
                  borderBottomWidth: 2,
                  marginTop: 10,
                  marginBottom: 10,
                  width: 30
                }}
              />
              <View
                style={{
                  backgroundColor: 'red',
                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: 20,
                  height: 20,
                  width: 20
                }}
              />
            </View>
            <Text style={styles.signUpText}>BUSINESS INFORMATION</Text>
            <KeyboardAvoidingView behavior={'position'}>
              <SignupForm navigation={this.props.navigation} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Signup2Screen;
