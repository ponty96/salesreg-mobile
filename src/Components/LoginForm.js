import React from "react";
import {Form} from "native-base";

import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';

class LoginForm extends React.Component {
  render() {
    return (
      <Form>
        <InputAtom
          label="Phone number"
          keyboardType="numeric"
        />

        <InputAtom
          label="Password"
          secureTextEntry={true}
        />

        <ButtonAtom btnText="Forgot password" transparent={true}/>
        <ButtonAtom btnText="Login" />
        <ButtonAtom btnText="I don't have an account" transparent={true}/>
      </Form>
    );
  }
}


export default LoginForm;