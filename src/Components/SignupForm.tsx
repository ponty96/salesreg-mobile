import { Form, Icon } from 'native-base'
import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ButtonAtom from '../Atom/ButtonAtom'
import InputAtom from '../Atom/InputAtom'
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

// interface IState {}

class SigupForm extends PureComponent<IProps, any> {
  public render() {
    const { fieldErrors } = this.props
    return (
      <Form>
        <InputAtom
          label="Full name"
          contStyle={styles.nameInput}
          defaultValue={this.props.name}
          // tslint:disable-next-line:jsx-no-lambda
          getValue={val => this.props.onUpdateState('name', val)}
          inputStyle={styles.elevateInput}
          required={true}
          error={
            fieldErrors &&
            (fieldErrors.firstName || fieldErrors.lastName || fieldErrors.name)
          }
        />

        <InputAtom
          label="Email Address"
          contStyle={styles.input}
          defaultValue={this.props.email}
          // tslint:disable-next-line:jsx-no-lambda
          getValue={val => this.props.onUpdateState('email', val)}
          inputStyle={styles.elevateInput}
          required={true}
          error={fieldErrors && fieldErrors.email}
        />

        <View style={styles.pickerWrapper}>
          <PickerAtom
            list={['male', 'female']}
            style={styles.faintPicker}
            placeholder="*Gender"
            selected={this.props.gender}
            // tslint:disable-next-line:jsx-no-lambda
            handleSelection={val => this.props.onUpdateState('gender', val)}
          />
        </View>
        <View style={styles.pickerUnderline} />
        {fieldErrors &&
          fieldErrors.gender && (
            <Text style={styles.errorText}>{fieldErrors.gender}</Text>
          )}

        <InputAtom
          label="Password"
          secureTextEntry={true}
          contStyle={styles.input}
          defaultValue={this.props.password}
          // tslint:disable-next-line:jsx-no-lambda
          getValue={val => this.props.onUpdateState('password', val)}
          underneathText="Must be at least 6 characters"
          underneathStyle={styles.underneathText}
          inputStyle={styles.elevateInput}
          required={true}
          error={fieldErrors && fieldErrors.password}
        />

        <InputAtom
          label="Reenter-password"
          secureTextEntry={true}
          contStyle={styles.reenter}
          defaultValue={this.props.passwordConfirmation}
          // tslint:disable-next-line:jsx-no-lambda
          getValue={val =>
            this.props.onUpdateState('passwordConfirmation', val)
          }
          inputStyle={styles.elevateInput}
          required={true}
          error={fieldErrors && fieldErrors.passwordConfirmation}
        />

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={this.props.onNext}
        >
          <Text
            style={[styles.nextText, { fontFamily: 'SourceSansPro_Semibold' }]}
          >
            NEXT{' '}
          </Text>
          <Icon
            name="keyboard-arrow-right"
            type="MaterialIcons"
            style={styles.nextIcon}
          />
        </TouchableOpacity>
        <Text style={[styles.haveAccount, { fontFamily: 'SourceSansPro' }]}>
          Or you have an account?
        </Text>
        <ButtonAtom
          btnText="LOGIN"
          transparent={true}
          // tslint:disable-next-line:jsx-no-lambda
          onPress={() => this.props.navigation.navigate('Login')}
          textStyle={[styles.login, { fontFamily: 'SourceSansPro_Semibold' }]}
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
    opacity: 0.5,
    marginBottom: 5
  },
  pickerUnderline: {
    width: '50%',
    borderBottomColor: color.textBorderBottom,
    borderBottomWidth: 1,
    marginBottom: 10
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
