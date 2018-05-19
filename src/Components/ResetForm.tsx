import React from 'react';
import { Text } from 'react-native';
import { Form } from 'native-base';

import InputAtom from './../Atom/InputAtom';
import ButtonAtom from './../Atom/ButtonAtom';
import styles from './../Style/Form';
import styles1 from './../Style/exportStyles';

interface IProps {
    navigation: any;
    secretPhone: string;
}

interface IState {
    code: string;
}

class ResetForm extends React.Component<IProps, IState> {
  state = {
    code: ''
  };

  static defaultProps = {
    secretPhone: 'xxxxxxxxx678'
  };

  reset = () => {
    console.log(this.state.code)
  };

  resend = () => {
    console.log('Put resend logic here')
  };

  getCode = (code: string) => {
    this.setState({
      code
    })
  };

  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  };

    render() {
        return (
            <Form>
                <Text
                    style={styles.buttonsWrapper}
                >
                    A reset code will be sent to {this.props.secretPhone}. Enter the code to reset your password
                </Text>

        <InputAtom
          placeholder={'Enter Reset Code'}
          floatingLabel={false}
          getValue={this.getCode}
          contStyle={styles1.marginlessInput}
        />

        <ButtonAtom
          btnText="send another code"
          transparent={true}
          onPress={this.resend}
        />
        <ButtonAtom
          btnText="Reset Password"
          onPress={this.reset}
          disabled={this.state.code ? false : true}
        />
        <ButtonAtom
          btnText="I don't have an account"
          transparent={true}
          funcValue={'Signup'}
          onPress={this.navigate}
        />
      </Form>
    )
  }
}

export default ResetForm
