import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Form } from 'native-base';
import InputAtom from './../Atom/InputAtom';
import ButtonAtom from './../Atom/ButtonAtom';
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
}

interface IState {
  code: string;
}

class ResetForm extends React.Component<IProps, IState> {
  state = {
    code: ''
  };

  reset = () => {
    console.log(this.state.code);
  };

  resend = () => {
    console.log('Put resend logic here');
  };

  getCode = (code: string) => {
    this.setState({
      code
    });
  };

  navigate = (location: string) => {
    this.props.navigation.navigate(location);
  };

  render() {
    return (
      <Form style={styles.resetFormContainer}>
        <Text style={styles.resetPasswordText}>
          A reset code will be sent to xxxxxxxxx678. Enter the code to reset
          your password.
        </Text>

        <InputAtom
          placeholder={'Enter reset code'}
          floatingLabel={false}
          getValue={this.getCode}
          contStyle={styles.marginlessInput}
        />

        <ButtonAtom
          btnText="send another code"
          transparent={true}
          onPress={this.resend}
        />
        <ButtonAtom
          btnText="RESET PASSWORD"
          onPress={this.reset}
          disabled={this.state.code ? false : true}
          btnStyle={styles.resetButton}
        />
        <Text style={styles.noAccount}>Don't have an account?</Text>
        <ButtonAtom
          btnText="SIGN UP"
          transparent={true}
          funcValue={'Signup'}
          onPress={this.navigate}
        />
      </Form>
    );
  }
}

export default ResetForm;

const styles = StyleSheet.create({
  resetPasswordText: {
    color: color.menu
  },
  resetFormContainer: {
    marginTop: '4%'
  },
  marginlessInput: {
    marginLeft: 0
  },
  noAccount: {
    color: color.menu,
    textAlign: 'center',
    marginTop: '6%'
  },
  resetButton: {
    width: '100%',
    height: '17%',
    justifyContent: 'center'
  }
});
