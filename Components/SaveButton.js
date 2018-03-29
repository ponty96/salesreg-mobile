import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class SaveButton extends Component {
  render(){
    return(
      <TouchableOpacity style = {styles.button}>
        <Text style = { styles.buttonText }>
          { this.props.title }
        </Text>
      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderWidth: 0.2
  },
  buttonText: {
    color: 'black',
    fontSize: 17
  }
});