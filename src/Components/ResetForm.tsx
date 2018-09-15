import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Form } from 'native-base'
import InputAtom from '../Atom/InputAtom'
import ButtonAtom from '../Atom/ButtonAtom'
import { color } from '../Style/Color'

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
        <Text
          style={[styles.resetPasswordText, { fontFamily: 'Source Sans Pro' }]}
        >
          A reset code will be sent to xxxxxxxxx678. Enter the code to reset
          your password.
        </Text>

        <InputAtom
          placeholder={'Enter reset code'}
          floatingLabel={false}
          getValue={this.getCode}
          contStyle={styles.marginlessInput}
          keyboardType="numeric"
        />

        <ButtonAtom
          btnText="Send another code"
          transparent={true}
          onPress={this.resend}
          textStyle={styles.sendAnother}
        />
        <ButtonAtom
          btnText="RESET PASSWORD"
          onPress={this.reset}
          // disabled={this.state.code ? false : true}
          btnStyle={styles.resetButton}
          textStyle={[{ fontFamily: 'SourceSansPro-Semibold' }, styles.reset]}
        />
        <Text style={[styles.noAccount, { fontFamily: 'Source Sans Pro' }]}>
          Don't have an account?
        </Text>
        <ButtonAtom
          btnText="SIGN UP"
          transparent={true}
          funcValue={'Signup'}
          onPress={() => console.log('')}
          textStyle={[styles.signup]}
          btnStyle={styles.signUpButton}
        />
      </Form>
    )
  }
}

export default ResetForm

const styles = StyleSheet.create({
  resetPasswordText: {
    color: color.menu,
    marginBottom: 16,
    fontSize: 14
  },
  resetFormContainer: {
    marginTop: 16
  },
  marginlessInput: {
    marginLeft: 0
  },
  noAccount: {
    color: color.principal,
    textAlign: 'center',
    marginTop: 32,
    fontSize: 14
  },
  resetButton: {
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center'
  },
  signup: {
    marginVertical: 0,
    fontSize: 16,
    color: color.button
  },
  sendAnother: {
    color: color.button,
    fontSize: 16
  },
  reset: {
    fontSize: 16
  },
  signUpButton: {
    marginVertical: 0,
    paddingVertical: 0
  }
})
