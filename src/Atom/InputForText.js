import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class InputForText extends Component {
  constructor() {
    super();
    this.state = {
      useThis: false
    };
  }

  render() {
    return (
      <View style = {styles.wrapper}>
        <TextInput 
          onFocus= {this.props.onFocus}
          placeholder = { this.props.whatToInput }
          style = { styles.input || this.props.style}
          style={!this.state.useThis ? styles.input : this.props.style}
          placeholderTextColor="#c0c0c0"
          autoCapitalize="none"
          keyboardType = { this.props.keyboardType }
          underlineColorAndroid = "transparent"
          maxLength={this.props.length}
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
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
