import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import InputAtom from '../Atom/InputAtom';
import PickerAtom from '../Atom/PickerAtom';
import ImageAtom from '../Atom/ImageAtom';
import { color } from '../Style/Color';

interface IProps {
  image?: string;
  getImage?: (pic: string) => void;
  name: string;
  getName?: (name: string) => any;
  phoneNumber: string;
  getPhoneNumber?: (number: string) => any;
  gender: string;
  updateGender?: (gender: string) => any;
}

interface IState {}

class EditUserProfileForm extends Component<IProps, IState> {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.itemsContainer}>
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
            <PickerAtom list={['Male', 'Female']} style={styles.pickerStyle} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditUserProfileForm;

const styles = StyleSheet.create({
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  editDetailsWrapper: {
    marginTop: 30,
    marginBottom: 10
  },
  textTitle: {
    color: color.inactive,
    fontWeight: '400',
    fontSize: 14
  },
  itemsContainer: {
    flex: 4
  },
  pickerStyle: {
    width: 130,
    height: 35
  }
});
