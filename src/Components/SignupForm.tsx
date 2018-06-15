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
  confirm_password: string
  gender: string
}

class SigupForm extends PureComponent<IProps, IState> {
  state = {
    phone: '',
    password: '',
    name: '',
    confirm_password: '',
    gender: ''
  }

  signup = () => {
    console.log(
      this.state.phone,
      this.state.password,
      this.state.name,
      this.state.confirm_password,
      this.state.gender
    )
  }

  getPhone = (phone: string) => {
    this.setState({
      phone
    })
  }

  getPassword = (pass: string) => {
    this.setState({
      password: pass
    })
  }

  getName = (name: string) => {
    this.setState({
      name
    })
  }

  getConfirm = (confirmPass: string) => {
    this.setState({
      confirm_password: confirmPass
    })
  }

  updateGender = (selectedGender: string) => {
    this.setState({
      gender: selectedGender
    })
  }

  render() {
    return (
      <Form>
        <InputAtom
          label="Full name"
          getValue={this.getName}
          contStyle={styles.marginlessInput}
        />

        <InputAtom
          label="Phone number"
          getValue={this.getPhone}
          keyboardType="numeric"
          contStyle={styles.marginlessInput}
        />

        <View style={styles.pickerWrapper}>
          <PickerAtom
            list={['Male', 'Female']}
            style={styles.faintPicker}
            placeholder="Gender"
          />
        </View>

        <InputAtom
          label="Password"
          getValue={this.getPassword}
          secureTextEntry={true}
          contStyle={styles.marginlessInput}
          underneathText="Must be at least 6 characters"
        />

        <InputAtom
          label="Reenter-password"
          getValue={this.getConfirm}
          secureTextEntry={true}
          contStyle={styles.marginlessInput}
        />

        <View>
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={() => this.props.navigation.navigate('SecondSignUp')}
          >
            <Text style={styles.nextText}>NEXT </Text>
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
  marginlessInput: {
    marginLeft: 0
  },
  faintPicker: {
    color: color.inactive,
    height: 35
  },
  pickerWrapper: {
    marginTop: 25,
    borderBottomColor: color.inactive,
    borderBottomWidth: 0.5,
    width: '50%'
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: '2%'
  },
  nextText: {
    color: color.button
  },
  nextIcon: {
    color: color.button
  }
})
