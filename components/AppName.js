import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class AppName extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.name}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  name: {
    textAlign: "center", 
    fontSize: 30, 
    color: "#fff", 
    fontWeight: "bold", 
    paddingTop: 24,  
  }
});
