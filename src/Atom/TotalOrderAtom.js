import React from "react";
import { View, Text } from "react-native";

import { totalOrderStyle } from "./../Style/exportStyles";

export default class TotalOrderAtom extends React.Component {
  render() {
    return (
      <View style={totalOrderStyle.column}>
        <View style={totalOrderStyle.container}>
          <View style={totalOrderStyle.totalView}>
            <Text style={totalOrderStyle.totalText}>TOTAL SALES</Text>
          </View>
          <View style={totalOrderStyle.redNumberView}>
            <Text style={totalOrderStyle.redNumber}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        </View>
        <View style={totalOrderStyle.container}>
          <View style={totalOrderStyle.totalView}>
            <Text style={totalOrderStyle.totalText}>PROFIT</Text>
          </View>
          <View style={totalOrderStyle.peachView}>
            <Text style={totalOrderStyle.redNumber}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
