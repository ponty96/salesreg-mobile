import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, View, ListView, ScrollView } from "react-native";
import { Header, Right } from "native-base";

import PickerAtom from "../Atom/PickerAtom";
import DebtListAtom from "../Atom/DebtListAtom";
import TotalDebtAtom from "../Atom/TotalDebtAtom";
import { customerListStyles } from './../Style/exportStyles';
  
class DebtList extends Component {
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
        userDataSource: ds.cloneWithRows(this.props.items)
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
                  <PickerAtom list={["Fasting selling", "Slowest selling", "Highest profit", "Lowest profit"]}/>
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

DebtList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DebtList;