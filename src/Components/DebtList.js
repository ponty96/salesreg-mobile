import React, { Component } from "react";
import { Text, View, ListView, Image, TouchableOpacity } from "react-native";
import { Icon, Header, Right } from "native-base";
import PickerAtom from "../Atom/PickerAtom";
import DebtListAtom from "../Atom/DebtListAtom";
import TotalDebtAtom from "../Atom/TotalDebtAtom";
import { ScrollView } from "react-native-gesture-handler";

import { customerListStyles } from './../Style/exportStyles';
import { debtList } from "../config/data";

const users = debtList;
  
  export default class DebtList extends Component {
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
      return (
        <DebtListAtom
          items={user}
        />
      );
    }
  
    render() {
      return (
        <View style={customerListStyles.container}>
            <Header style={customerListStyles.header}>
                <Right style={customerListStyles.direct}>
                  <Text style={customerListStyles.dropText}>Sort By:</Text>
                  <PickerAtom />
                </Right>
            </Header>
                <ScrollView>
                    <ListView
                        dataSource={this.state.userDataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            <TotalDebtAtom limit={80000} totalAmount="80,000"/>
        </View>
      );
    }
  }