import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class InputForText extends Component {
  render() {
    return (
      <View style = {styles.wrapper}>
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
