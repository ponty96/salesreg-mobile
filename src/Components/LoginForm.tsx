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
  fieldErrors: any;
}

interface IState {
  email: string;
  password: string;
  isEdited: boolean;
}

class LoginForm extends PureComponent<IProps, IState> {
  state = {
    email: '',
    password: '',
    isEdited: false
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
    const { fieldErrors } = this.props;
    return (
      <Form>
        <InputAtom
          label="Email Address"
          getValue={this.getEmail}
          contStyle={styles.input}
          inputStyle={styles.elevateInput}
          login={true}
          error={fieldErrors && fieldErrors['email']}
        />

        <InputAtom
          label="Password"
          getValue={this.getPassword}
          secureTextEntry={true}
          contStyle={styles.input}
          underneathText="Must be at least 6 characters"
          underneathStyle={styles.underneathText}
          inputStyle={styles.elevateInput}
          login={true}
          error={fieldErrors && fieldErrors['password']}
        />

        <ButtonAtom
          btnText="Forgot password"
          textStyle={styles.forgotPasswordText}
          transparent={true}
          onPress={() => this.navigate('Reset')}
          btnStyle={styles.forgotPassword}
        />

        <ButtonAtom
          btnText="LOGIN"
          btnStyle={styles.loginButton}
          onPress={this.login}
          textStyle={[
            styles.loginText,
            { fontFamily: 'SourceSansPro_Semibold' }
          ]}
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
  input: {
    marginLeft: 0,
    marginTop: 0
  },
  forgotPassword: {
    marginVertical: 16
  },
  loginButton: {
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 16
  },
  noAccount: {
    color: color.principal,
    textAlign: 'center',
    marginTop: 32
  },
  signupButton: {
    paddingBottom: 32
  },
  signupText: {
    color: color.button,
    fontSize: 16
  },
  underneathText: {
    marginBottom: 0
  },
  forgotPasswordText: {
    color: color.button,
    fontSize: 16
  },
  elevateInput: {
    marginBottom: 5
  }
});
