import React from "react";
import {Form} from "native-base";
import PropTypes from "prop-types";

import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import { redButtonText, marginlessInput } from '../Style/exportStyles';

class LoginForm extends React.Component {
    state = {
        phone: undefined,
        password: undefined,
        underlineColorAndroid: 'red'
    }

    login = () => {
        console.log(this.state.phone, this.state.password);
        this.props.navigation.navigate('App')
    }

    getPhone = (phone) => {
        this.setState(
            {
                phone
            }
        );
    }

    getPassword = (pass) => {
        this.setState(
            {
                password: pass
            }
        );
    }

    navigate = (location) => {
        this.props.navigation.navigate(location)
    }

  render() {
    return (
      <Form>
        <InputAtom
          label="Phone number"
          getValue={this.getPhone}
          keyboardType="numeric"
          contStyle={marginlessInput}
        />

        <InputAtom
          label="Password"
          getValue={this.getPassword}
          secureTextEntry={true}
          contStyle={marginlessInput}
          underneathText = 'Not less than 6 characters long'
        />

        <ButtonAtom
            btnText="Forgot password"
            transparent={true}
            funcValue = {'Reset'}
            onPress={this.navigate}
        />
        <ButtonAtom
            btnText="Login"
            onPress={this.login}
        />
        <ButtonAtom
            btnText="I don't have an account"
            transparent={true}
            funcValue = {'Signup'}
            onPress={this.navigate}
        />
      </Form>
    );
  }
}

LoginForm.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default LoginForm;