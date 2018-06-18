import React, { PureComponent } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet } from 'react-native';

import ResetForm from '../Components/ResetForm';
import AuthenticationHeader from '../Components/AuthenticationHeader';
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
}

class ResetScreen extends PureComponent<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <View style={styles.wrapper}>
          <Text style={styles.signUpText}>RESET PASSWORD</Text>
          <KeyboardAvoidingView behavior="position">
            <ResetForm navigation={this.props.navigation} />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

export default ResetScreen;

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
});
