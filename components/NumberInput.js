import React from "react";
import { StyleSheet, Text, TextInput} from "react-native";

export default class NumberInput extends React.Component {

  render() {
    return (
      <TextInput
        style={styles.input}
        underlineColorAndroid="#c0c0c0"
        placeholder={this.props.placeholder}
        placeholderTextColor="#c0c0c0"
        autoCapitalize="none"
        keyboardType="numeric"
        maxLength={this.props.length}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 3,
    marginLeft: 15,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "#fff",
    padding: 2
  }
});
