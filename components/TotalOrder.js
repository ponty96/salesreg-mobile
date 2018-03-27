import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class TotalOrder extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.totalView}>
            <Text style={styles.totalText}>TOTAL</Text>
            </View>
            <View style={styles.redNumberView}>
            <Text style={styles.redNumber}>NGN {this.props.totalAmount}.00</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      flex: 1,
      marginTop: 1,
  },
  totalView: {
    width: '30%',
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgrey",
  },
  redNumber: {
    color: 'rgba(218,11,11,59)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  redNumberView: {
    width: '70%',
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC0CB',
  },

});
