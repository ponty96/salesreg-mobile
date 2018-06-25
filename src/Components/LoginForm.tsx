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
  underlineColorAndroid: string
}

class LoginForm extends PureComponent<IProps, IState> {
  static defaultProps = {
    items: userData.business[0].products
  }

  state = {
    phone: '',
    password: '',
    underlineColorAndroid: 'red'
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
          contStyle={styles.marginlessInput}
        />

        <InputAtom
          label="Password"
          getValue={this.getPassword}
          secureTextEntry={true}
          contStyle={styles.marginlessInput}
          underneathText="Must be at least 6 characters"
          underneathStyle={styles.underneathText}
        />

        <ButtonAtom
          btnText="Forgot password"
          textStyle={styles.btnColor}
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
  marginlessInput: {
    marginLeft: 0
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
    color: color.menu,
    textAlign: 'center',
    marginTop: 32
  },
  signupButton: {
    paddingBottom: 32
  },
  signupText: {
    color: color.button
  },
  underneathText: {
    marginBottom: 0
  },
  btnColor: {
    color: color.button
  }
})
