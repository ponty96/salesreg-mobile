import React, { PureComponent } from 'react'
import { Form, Text } from 'native-base'

import InputAtom from '../Atom/InputAtom'
import ButtonAtom from '../Atom/ButtonAtom'
import styles from '../Style/exportStyles'

interface IProps {
  navigation: any
}

interface IState {
  phone: string
  password: string
  underlineColorAndroid: string
}

class LoginForm extends PureComponent<IProps, IState> {
  state = {
    phone: '',
    password: '',
    underlineColorAndroid: 'red'
  }

  login = () => {
    console.log(this.state.phone, this.state.password)
    this.props.navigation.navigate('App')
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
        />

        <ButtonAtom
          btnText="Forgot password"
          transparent={true}
          funcValue={'Reset'}
          onPress={this.navigate}
        />

        <ButtonAtom
          btnText="LOGIN"
          btnStyle={styles.loginButton}
          onPress={this.login}
        />

        <Text style={styles.noAccount}>Don't have an account?</Text>

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

export default LoginForm
