import React, { PureComponent } from 'react'
import { Form, Icon } from 'native-base'
import { View, TouchableOpacity, Text } from 'react-native'

import InputAtom from '../Atom/InputAtom'
import PickerAtom from '../Atom/PickerAtom'
import styles from '../Style/Form'
import styles1 from '../Style/exportStyles'

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
          contStyle={styles1.marginlessInput}
        />

        <InputAtom
          label="Phone number"
          getValue={this.getPhone}
          keyboardType="numeric"
          contStyle={styles1.marginlessInput}
        />

        <View style={[styles.genderPickerStyle, styles1.marginlessInput]}>
          <PickerAtom
            list={['Gender', 'Male', 'Female']}
            style={styles1.faintPicker}
          />
        </View>

        <InputAtom
          label="Password"
          getValue={this.getPassword}
          secureTextEntry={true}
          contStyle={styles1.marginlessInput}
          underneathText="Must be at least 6 characters"
        />

        <InputAtom
          label="Reenter-password"
          getValue={this.getConfirm}
          secureTextEntry={true}
          contStyle={styles1.marginlessInput}
        />

        <View>
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={() => this.props.navigation.navigate('SignUp2')}
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
