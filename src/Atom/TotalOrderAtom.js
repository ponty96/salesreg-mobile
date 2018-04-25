import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class TotalOrderAtom extends React.Component {
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.container}>
            <View style={styles.totalView}>
            <Text style={styles.totalText}>TOTAL SALES</Text>
            </View>
            <View style={styles.redNumberView}>
            <Text style={styles.redNumber}>NGN {this.props.totalAmount}.00</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.totalView}>
            <Text style={styles.totalText}>PROFIT</Text>
            </View>
            <View style={styles.peachView}>
            <Text style={styles.redNumber}>NGN {this.props.totalAmount}.00</Text>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    borderBottomWidth: 1,
    borderBottomColor: "red"
  },
  container: {
      flexDirection: 'row',
      flex: 1,
      borderTopWidth: 0.5,
      borderTopColor: "#f0f0f0"
  },
  totalView: {
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000",
  },
  redNumber: {
    color: 'rgba(218,11,11,59)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  redNumberView: {
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEEF4',
  },
  peachView: {
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FDD7E4'
  }

});
