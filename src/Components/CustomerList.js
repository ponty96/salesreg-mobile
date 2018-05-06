import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, ListView, ScrollView } from "react-native";

import CustomerListAtom from "../Atom/CustomerListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import { customerListStyles } from './../Style/exportStyles';

class CustomerList extends Component {
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

CustomerList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default CustomerList;