import React, { Component } from "react";
import { Text, View, ListView, FlatList, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import CustomerListAtom from "../Atom/CustomerListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import { ScrollView } from "react-native-gesture-handler";

import { customerListStyles } from './../Style/exportStyles';
import { customerList } from "../config/data";



export default class CustomerList extends Component {

  onPress = () => {};

  renderItem = ({item}) => {
    let latestAmount =
      item.status == "paid"
        ? item.debt
        : item.status == "balance" ? item.balance : item.debt;
    let realStyle;
    if (item.status == "paid"){
       realStyle = "paid";
    } else if (item.status == "balance"){
       realStyle = "balance";
    } else {
       realStyle = "debt";
    }
    return (
      <CustomerListAtom
        items={item}
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
            <FlatList
              data={customerList}
              renderItem={this.renderItem}
              keyExtractor={item => item.key}
            />
          </ScrollView>
      </View>
    );
  }
}