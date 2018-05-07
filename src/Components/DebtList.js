import React, { Component } from "react";
import { Text, View, ListView, FlatList, Image, TouchableOpacity } from "react-native";
import { Icon, Header, Right } from "native-base";
import PickerAtom from "../Atom/PickerAtom";
import DebtListAtom from "../Atom/DebtListAtom";
import TotalDebtAtom from "../Atom/TotalDebtAtom";
import { ScrollView } from "react-native-gesture-handler";

import { customerListStyles } from './../Style/exportStyles';
import { debtList } from "../config/data";
  
  export default class DebtList extends Component {
   
    onPress = () => {};
  
    renderItem = ({item}) => {
      return (
        <DebtListAtom
          items={item}
        />
      );
    }
  
    render() {
      return (
        <View style={customerListStyles.container}>
            <Header style={customerListStyles.header}>
                <Right style={customerListStyles.direct}>
                  <Text style={customerListStyles.dropText}>Sort By:</Text>
                  <PickerAtom list={["Fasting selling", "Slowest selling", "Highest profit", "Lowest profit"]}/>
                </Right>
            </Header>
                <ScrollView>
                    <FlatList
                      data={debtList}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.key}
                    />
                </ScrollView>
            <TotalDebtAtom limit={80000} totalAmount="80,000"/>
        </View>
      );
    }
  }