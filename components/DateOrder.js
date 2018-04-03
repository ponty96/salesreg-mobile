import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class DateOrder extends React.Component {
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
    height: 85,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgrey",
  }
});
