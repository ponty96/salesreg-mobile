import React, { Component } from "react";
import { Text, View, ListView, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import CustomerListAtom from "../Atom/CustomerListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import { ScrollView } from "react-native-gesture-handler";

import { customerListStyles } from './../Style/exportStyles';
import { customerList } from "../config/data";

const users = customerList;

export default class CustomerList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      userDataSource: ds.cloneWithRows(users)
    };
  }

  onPress = () => {};

  renderRow(user) {

    let latestAmount =
      user.status == "paid"
        ? user.debt
        : user.status == "balance" ? user.balance : user.debt;
    let realStyle;
    if (user.status == "paid"){
       realStyle = "paid";
    } else if (user.status == "balance"){
       realStyle = "balance";
    } else {
       realStyle = "debt";
    }
    return (
      <CustomerListAtom
        items={user}
        latestAmount={latestAmount}
        realStyle={realStyle}
      />
    );
  }

  render() {
    return (
      <View style={customerListStyles.container}>
        <SubHeaderAtom total = "250" list={["Highest Purchase", "Lowest Purchase", "Resent Purchase", "Frequent Purchase", "Earliest Payment", "Latest Payment", "Customer Rating"]}/>
          <ScrollView>
            <ListView
              dataSource={this.state.userDataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </ScrollView>
      </View>
    );
  }
}