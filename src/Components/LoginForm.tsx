import React, { PureComponent } from 'react'
import { Form, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import InputAtom from '../Atom/InputAtom'
import ButtonAtom from '../Atom/ButtonAtom'
import { userData } from '../config/default'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
  items?: any[]
}

interface IState {
  phone: string
  password: string
  isEdited: boolean
}

class LoginForm extends PureComponent<IProps, IState> {
  static defaultProps = {
    items: userData.business[0].products
  }

  state = {
    phone: '',
    password: '',
    isEdited: false
  }

  login = (data: any) => {
    console.log(this.state.phone, this.state.password)
    data = this.props.items
    this.props.navigation.navigate('App', data)
  }

  getPhone = (phone: any) => {
    this.setState({
      phone
    })
  }

  getPassword = (pass: any) => {
    this.setState({
      password: pass
    })
  }

  navigate = (location: any) => {
    this.props.navigation.navigate(location)
  }

  render() {
    return (
      <Form>
        <InputAtom
          label="Phone number"
          getValue={this.getPhone}
          keyboardType="numeric"
          contStyle={styles.input}
          inputStyle={styles.elevateInput}
          maxLength={11}
          login={true}
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
        />

        <ButtonAtom
          btnText="Forgot password"
          textStyle={styles.forgotPasswordText}
          transparent={true}
          funcValue={'Reset'}
          onPress={this.navigate}
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
          funcValue={'Signup'}
          onPress={this.navigate}
          btnStyle={styles.signupButton}
          textStyle={styles.signupText}
        />
      </Form>
    )
  }
}

export default LoginForm

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
})
