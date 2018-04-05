import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

export default class InputAtom extends Component {
  render() {
    return (
      <View style = {styles.wrapper}>
        <View style = { styles.wrapperForAsterikAndTextInput }>
          <Text style = {styles.asterik}>
            {(this.props.required === true) ? '*' : ''}
          </Text>
          <TextInput 
          placeholder = { this.props.placeholder }
          style = { styles.input }
          keyboardType = { this.props.keyboardType }
          secureTextEntry = { this.props.secureTextEntry }
          maxLength = { this.props.maxLength }
          underlineColorAndroid = 'transparent'
          />
        </View>
        <Text style = {styles.bottomLabel}>
          { this.props.bottomLabel }
        </Text>
      </View>
    );

    
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10
  },
  wrapperForAsterikAndTextInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
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
  },
  bottomLabel: {
    color: 'lightgrey',
  }
});
