import React, { PureComponent } from 'react';
import { Form, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
  onSubmit?: (params: any) => void;
  loading?: boolean;
}

interface IState {
  email: string;
  password: string;
  underlineColorAndroid: string;
}

class LoginForm extends PureComponent<IProps, IState> {
  state = {
    email: '',
    password: '',
    underlineColorAndroid: 'red'
  };

  login = () => {
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    });
  };

  getEmail = (email: any) => {
    this.setState({
      email
    });
  };

  getPassword = (pass: any) => {
    this.setState({
      password: pass
    });
  };

  navigate = (location: any) => {
    this.props.navigation.navigate(location);
  };

  render() {
    return (
      <Form>
        <InputAtom
          label="Email Address"
          getValue={this.getEmail}
          contStyle={styles.marginlessInput}
        />

        <InputAtom
          label="Password"
          getValue={this.getPassword}
          secureTextEntry={true}
          contStyle={styles.marginlessInput}
          underneathText="Must be at least 6 characters"
        />

        <ButtonAtom
          btnText="Forgot password"
          textStyle={styles.btnColor}
          transparent={true}
          onPress={() => this.navigate('Reset')}
        />

        <ButtonAtom
          btnText="LOGIN"
          btnStyle={styles.loginButton}
          onPress={this.login}
        />

        <Text style={[styles.noAccount, { fontFamily: 'SourceSansPro' }]}>
          Don't have an account?
        </Text>

        <ButtonAtom
          btnText="SIGN UP"
          transparent={true}
          onPress={() => this.navigate('Signup')}
          btnStyle={styles.signupButton}
          textStyle={styles.signupText}
        />
      </Form>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0
  },
  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center'
  },
  noAccount: {
    color: color.menu,
    textAlign: 'center',
    marginTop: '6%'
  },
  signupButton: {
    paddingBottom: '5%'
  },
  signupText: {
    color: color.button,
    fontWeight: 'bold'
  },
  btnColor: {
    color: color.button
  }
});
