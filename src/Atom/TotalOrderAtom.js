import React from "react";
import { View, Text } from "react-native";

import totalOrderStyle from './../Style/exportStyles';

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