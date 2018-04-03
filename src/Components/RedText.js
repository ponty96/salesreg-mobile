import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class RedText extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "rgba(218,11,11,59)",
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    paddingBottom: 15,
  }
});
