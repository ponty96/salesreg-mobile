import React, { PureComponent } from 'react'
import { Form, Icon } from 'native-base'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import InputAtom from '../Atom/InputAtom'
import PickerAtom from '../Atom/PickerAtom'
import { color } from '../Style/Color'

interface IProps {
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
    return (
      <Form>
        <InputAtom
          label="*Full name"
          contStyle={styles.nameInput}
          defaultValue={this.state.name}
          getValue={val => this.updateState('name', val)}
          inputStyle={styles.elevateInput}
        />

        <InputAtom
          label="Phone number"
          keyboardType="numeric"
          contStyle={styles.input}
          defaultValue={this.state.phone}
          getValue={val => this.updateState('phone', val)}
          inputStyle={styles.elevateInput}
        />

        <View style={styles.pickerWrapper}>
          <PickerAtom
            list={['Male', 'Female']}
            style={styles.faintPicker}
            placeholder="*Gender"
            selected={this.state.gender}
            handleSelection={val => this.updateState('gender', val)}
          />
        </View>
        <View style={styles.pickerUnderline} />

        <InputAtom
          label="*Password"
          secureTextEntry={true}
          contStyle={styles.input}
          defaultValue={this.state.password}
          getValue={val => this.updateState('password', val)}
          underneathText="Must be at least 6 characters"
          underneathStyle={styles.underneathText}
          inputStyle={styles.elevateInput}
        />

        <InputAtom
          label="Reenter-password"
          secureTextEntry={true}
          contStyle={styles.reenter}
          defaultValue={this.state.passwordConfirmation}
          getValue={val => this.updateState('passwordConfirmation', val)}
          inputStyle={styles.elevateInput}
        />

        <View>
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={() => this.props.navigation.navigate('SecondSignUp')}
          >
            <Text
              style={[
                styles.nextText,
                { fontFamily: 'SourceSansPro_Semibold' }
              ]}
            >
              NEXT{' '}
            </Text>
            <Icon
              name="trending-flat"
              type="MaterialIcons"
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </View>
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
    marginBottom: 6
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
    marginTop: 5,
    marginLeft: 0
  }
})
