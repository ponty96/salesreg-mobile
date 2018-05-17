import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Form } from 'native-base'
import PropTypes from 'prop-types'

import InputAtom from '../Atom/InputAtom'
import PickerAtom from '../Atom/PickerAtom'
import ImageAtom from '../Atom/ImageAtom'
import styles1 from './../Style/Layout'
import styles from './../Style/Screen'
import SaveCancelButton from '../Container/SaveCancelButton'
import styles2 from '../Style/exportStyles'

class EditUserProfileForm extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles1.itemsContainer}>
        <ScrollView>
          <ImageAtom source={this.props.image} getValue={this.props.getImage} />
          <View
            style={[
              styles.indentLeft,
              styles.indentRight,
              styles.editDetailsWrapper
            ]}
          >
            <InputAtom
              label="Name:"
              defaultValue={this.props.name}
              getValue={this.props.getName}
            />
          </View>

          <View
            style={[
              styles.indentLeft,
              styles.indentRight,
              styles.editDetailsWrapper
            ]}
          >
            <InputAtom
              label="Phone number (separate multiple with commas):"
              defaultValue={this.props.phoneNumber}
              getValue={this.props.getPhoneNumber}
              keyboardType="numeric"
            />
          </View>

          <View
            style={[
              styles.indentLeft,
              styles.editDetailsWrapper,
              styles.genderPickerWidth
            ]}
          >
            <Text style={styles.textTitle}>Gender</Text>
            <PickerAtom list={['Male', 'Female']} style={styles2.pickerStyle} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

EditUserProfileForm.propTypes = {
  image: PropTypes.string,
  getImage: PropTypes.func,
  name: PropTypes.string.isRequired,
  getName: PropTypes.func,
  phoneNumber: PropTypes.string.isRequired,
  getPhoneNumber: PropTypes.func,
  gender: PropTypes.string.isRequired,
  updateGender: PropTypes.func
}

export default EditUserProfileForm
