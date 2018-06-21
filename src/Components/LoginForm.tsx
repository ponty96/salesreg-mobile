import React, { PureComponent } from 'react'
import { Font, AppLoading } from 'expo'
import { Root, Form, Text } from 'native-base'
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
  loading: boolean
}

class LoginForm extends PureComponent<IProps, IState> {
  static defaultProps = {
    items: userData.business[0].products
  }

  state = {
    phone: '',
    password: '',
    underlineColorAndroid: 'red',
    loading: true
  }
  async componentDidMount() {
    await Font.loadAsync({
      SourceSansPro: require('../../Fonts/SourceSansPro-Regular.ttf'),
      SourceSansPro_Semibold: require('../../Fonts/SourceSansPro-Semibold.ttf'),
      SourceSansPro_Bold: require('../../Fonts/SourceSansPro-Bold.ttf')
    })
    this.setState({ loading: false })
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
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
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
          textStyle={styles.btnColor}
          transparent={true}
          funcValue={'Reset'}
          onPress={this.navigate}
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
})
