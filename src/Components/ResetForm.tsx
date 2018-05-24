import React from 'react'
import { Text } from 'react-native'
import { Form } from 'native-base'

import InputAtom from './../Atom/InputAtom'
import ButtonAtom from './../Atom/ButtonAtom'
import styles from './../Style/Form'
import styles1 from './../Style/exportStyles'

interface IProps {
  navigation: any
}

interface IState {
  code: string
}

class ResetForm extends React.Component<IProps, IState> {
  state = {
    code: ''
  }

  reset = () => {
    console.log(this.state.code)
  }

  resend = () => {
    console.log('Put resend logic here')
  }

  getCode = (code: string) => {
    this.setState({
      code
    })
  }

  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

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
          contStyle={styles1.marginlessInput}
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
          btnStyle={styles1.resetButton}
        />
        <Text style={styles1.noAccount}>Don't have an account?</Text>
        <ButtonAtom
          btnText="SIGN UP"
          transparent={true}
          funcValue={'Signup'}
          onPress={this.navigate}
        />
      </Form>
    )
  }
}

export default ResetForm
