import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

export default class InputForBirthday extends Component {
  render() {
    return(
      <View style = { styles.wrapper }>
        <View styles = { styles.textInputWrapper }>
          <TextInput 
            style = { styles.input }
            placeholder = 'Birthday'
            keyboardType = 'phone-pad'
            underlineColorAndroid = 'transparent'
            maxLength = { 5 }
          />
        </View>
        <Text style = {styles.label}>
          DD/MM
        </Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    color: 'grey',
    fontSize: 17,
    paddingBottom: 7,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  label: {
    color: 'lightgrey',
  }
});