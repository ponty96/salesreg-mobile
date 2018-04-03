import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

export default class RequiredTextInput extends Component {
  render() {
    return (
      <View style = {styles.wrapper}>
        <Text style = {styles.asterik}>
          *
        </Text>
        <TextInput 
        placeholder = { this.props.whatToInput }
        style = { styles.input }
        keyboardType = { this.props.keyboardType }
        underlineColorAndroid = 'transparent'
        />
      </View>
    );

    
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', 
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginLeft: 10,
    marginRight: 10
  },
  asterik: {
    color: 'red',
    marginTop: 13,
    fontSize: 20
  },
  input: {
    color: 'grey',
    marginRight: 10,
    marginBottom: 7,
    marginTop: 15,
    fontSize: 17,
    flex: 1,
    marginLeft: 1,
  }
  
});
