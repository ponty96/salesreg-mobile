import React from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";

import { totalDebtStyle } from "./../Style/exportStyles";

export default class TotalDebtAtom extends React.Component {
  render() {
    let icon = this.props.limit >= 300000 ? "md-warning" : "md-add";
    let iconc = this.props.limit >= 300000 ? "red" : "transparent";
    display = () => {
      if (this.props.limit >= 300000) {
        return <Icon name={icon} style={{ color: iconc, fontSize: 22 }} />;
      }
    };
    displayView = () => {
      if (this.props.limit <= 100000) {
        return (
          <View style={totalDebtStyle.redNumberView}>
            <Text style={totalDebtStyle.redNumber}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        );
      } else if (this.props.limit > 100000 && this.props.limit <= 299999) {
        return (
          <View style={totalDebtStyle.redNumberView1}>
            <Text style={totalDebtStyle.redNumber1}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        );
      } else {
        return (
          <View style={totalDebtStyle.redNumberView2}>
            <Text style={totalDebtStyle.redNumber1}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        );
      }
    };
    return (
      <View style={totalDebtStyle.container}>
        <View style={totalDebtStyle.totalView}>
          {display()}
          <Text style={totalDebtStyle.totalText}> TOTAL</Text>
        </View>
        {displayView()}
      </View>
    );
  }
}
