import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class DateOrderAtom extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>{this.props.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    height: 60,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0"
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgrey",
  }
});
