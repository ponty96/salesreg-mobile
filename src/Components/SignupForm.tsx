import React, { PureComponent } from 'react'
import { Form } from 'native-base'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from '../Atom/Icon'
import InputAtom from '../Atom/InputAtom'
import ButtonAtom from '../Atom/ButtonAtom'
import PickerAtom from '../Atom/PickerAtom'
import { color } from '../Style/Color'

interface IProps {
  onNext: () => void
  onUpdateState?: (key: string, val: any) => void
  email: string
  password: string
  name: string
  passwordConfirmation: string
  gender: string
  fieldErrors: any
  onBack: () => void
  navigation: any
}

interface IState {
  phone: string
  password: string
  name: string
  passwordConfirmation: string
  gender: string
}

class SigupForm extends PureComponent<IProps, IState> {
  state = {
    phone: '',
    password: '',
    name: '',
    passwordConfirmation: '',
    gender: ''
  }

  signup = () => {
    console.log(
      this.state.phone,
      this.state.password,
      this.state.name,
      this.state.passwordConfirmation,
      this.state.gender
    )
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  render() {
    const { fieldErrors } = this.props
    return (
      <Form>
        <InputAtom
          label="Full name"
          placeholder="e.g John Doe"
          contStyle={styles.nameInput}
          defaultValue={this.state.name}
          getValue={val => this.updateState('name', val)}
          inputStyle={styles.elevateInput}
          required={true}
          error={
            fieldErrors &&
            (fieldErrors['firstName'] ||
              fieldErrors['lastName'] ||
              fieldErrors['name'])
          }
        />

        <InputAtom
          label="Email"
          contStyle={styles.input}
          defaultValue={this.state.phone}
          getValue={val => this.updateState('phone', val)}
          inputStyle={styles.elevateInput}
          required={true}
          error={fieldErrors && fieldErrors['email']}
          placeholder="e.g lagbaja@example.com"
        />

        <View style={styles.pickerWrapper}>
          <PickerAtom
            list={['MALE', 'FEMALE']}
            placeholder="*Gender"
            selected={this.props.gender || 'FEMALE'}
            handleSelection={val => this.props.onUpdateState('gender', val)}
            label="Gender"
          />
        </View>
        {fieldErrors &&
          fieldErrors['gender'] && (
            <Text style={styles.errorText}>{fieldErrors['gender']}</Text>
          )}

        <InputAtom
          label="Password"
          secureTextEntry={true}
          contStyle={styles.input}
          defaultValue={this.state.password}
          getValue={val => this.updateState('password', val)}
          underneathText="Must be at least 6 characters"
          underneathStyle={styles.underneathText}
          inputStyle={styles.elevateInput}
          required={true}
          error={fieldErrors && fieldErrors['password']}
          placeholder="Enter your super secret password"
        />

        <InputAtom
          label="Password Confirmation"
          secureTextEntry={true}
          contStyle={styles.reenter}
          defaultValue={this.state.passwordConfirmation}
          getValue={val => this.updateState('passwordConfirmation', val)}
          inputStyle={styles.elevateInput}
          required={true}
          error={fieldErrors && fieldErrors['passwordConfirmation']}
          placeholder="Please Re-Type Password"
        />

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={this.props.onNext}
        >
          <Text
            style={[styles.nextText, { fontFamily: 'SourceSansPro-Semibold' }]}
          >
            NEXT{' '}
          </Text>
          <Icon
            name="keyboard-arrow-right"
            type="MaterialIcons"
            style={styles.nextIcon}
          />
        </TouchableOpacity>
        <Text style={[styles.haveAccount, { fontFamily: 'Source Sans Pro' }]}>
          Or you have an account?
        </Text>
        <ButtonAtom
          btnText="LOGIN"
          transparent={true}
          onPress={() => this.props.navigation.navigate('Login')}
          textStyle={[styles.login, { fontFamily: 'SourceSansPro-Semibold' }]}
          btnStyle={styles.loginButton}
        />
      </Form>
    )
  }
}

export default SigupForm

const styles = StyleSheet.create({
  nameInput: {
    marginLeft: 0,
    marginTop: 16
  },
  elevateInput: {
    marginBottom: 5
  },
  input: {
    marginLeft: 0,
    marginTop: 0
  },
  faintPicker: {
    height: 35
  },
  pickerWrapper: {
    marginTop: 16,
    width: '50%',
    marginBottom: 5
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: 32
  },
  nextText: {
    color: color.button,
    fontSize: 16
  },
  nextIcon: {
    color: color.button
  },
  underneathText: {
    marginBottom: 0
  },
  reenter: {
    marginTop: 10,
    marginLeft: 0
  },
  haveAccount: {
    marginTop: 16,
    textAlign: 'center',
    color: color.principal,
    fontSize: 14
  },
  login: {
    color: color.button,
    fontSize: 16
  },
  loginButton: {
    marginVertical: 0
  },
  errorText: {
    marginLeft: 0,
    color: 'red',
    fontSize: 12,
    marginBottom: 25,
    marginTop: 2
  }
})
