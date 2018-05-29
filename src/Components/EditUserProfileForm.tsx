import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'

import InputAtom from '../Atom/InputAtom'
import PickerAtom from '../Atom/PickerAtom'
import ImageAtom from '../Atom/ImageAtom'
import styles1 from './../Style/Layout'
import styles from './../Style/Screen'
import styles2 from '../Style/exportStyles'

interface IProps {
  image?: string
  getImage?: (pic: string) => void
  name: string
  getName?: (name: string) => any
  phoneNumber: string
  getPhoneNumber?: (num: string) => any
  gender: string
  updateGender?: (gender: string) => any
}

interface IState {}

class EditUserProfileForm extends Component<IProps, IState> {
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

          <View style={[styles.indentLeft, styles.editDetailsWrapper]}>
            <Text style={styles.textTitle}>Gender</Text>
            <PickerAtom
              list={['Gender', 'Male', 'Female']}
              style={styles2.pickerStyle}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default EditUserProfileForm
