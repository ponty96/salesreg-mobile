import React, { Component } from "react";
import { Text, View, ListView, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import CustomerListAtom from "../Atom/CustomerListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import { ScrollView } from "react-native-gesture-handler";

import { customerListStyles } from './../Style/exportStyles';

const users = [
  {
    customerName: "Mr James",
    date: "19 March 2018",
    amount: "12,000",
    balance: "0",
    debt: "3,000",
    status: "debt",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
  },
  {
    customerName: "Mrs Salomy",
    date: "19 March 2018",
    amount: "12,000",
    balance: "0",
    debt: "0",
    status: "paid",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
  },
  {
    customerName: "Mummy Ella",
    date: "19 March 2018",
    amount: "3,500",
    balance: "500",
    debt: "0",
    status: "balance",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
  },
  {
    customerName: "Mr David",
    date: "19 March 2018",
    time: "10:00am",
    amount: "2,500",
    balance: "0",
    debt: "0",
    status: "paid",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
  },
  {
    customerName: "Klazbaba",
    date: "19 March 2018",
    amount: "5,000",
    balance: "0",
    debt: "5,000",
    status: "debt",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
  },
  {
    customerName: "Mummy Ella",
    date: "20 March 2018",
    amount: "3,000",
    balance: "0",
    debt: "0",
    status: "paid",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
  },
  {
    customerName: "Frank Basit",
    date: "20 March 2018",
    amount: "3,000",
    balance: "0",
    debt: "2,000",
    status: "debt",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
  },
  {
    customerName: "Emanbe",
    date: "20 March 2018",
    amount: "13,000",
    balance: "5,000",
    debt: "0",
    status: "balance",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
  },
  {
    customerName: "Tracy Baddass",
    date: "20 March 2018",
    amount: "10,000",
    balance: "0",
    debt: "6,000",
    status: "debt",
    images:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
  }
];

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
        <SubHeaderAtom total = "250" />
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