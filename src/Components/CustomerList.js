import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import CustomerListAtom from "../Atom/CustomerListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import { ScrollView } from "react-native-gesture-handler";

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

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-person" style={{ color: tintColor }} />
    )
  };

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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c0c0c0",
    flex: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    top: 0,
    padding: 10,
    height: 75,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 0.5,
    borderBottomWidth: .5,
    borderBottomColor: "#c0c0c0",
  },
  rowText1: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 13,
    paddingLeft: 20,
    paddingTop: 15,
    color: "#000"
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    color: "#000",
    paddingRight: 18,
    fontSize: 13
  },
  image: {
    height: 20,
    width: 20,
    padding: 6
  },
  dp: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    margin: 8
  },
  icons: {
    backgroundColor: "#fff",
    height: 25,
    width: 25
  },
  lilFont: {
    fontSize: 10
  },
  paid: {
    fontSize: 10,
    color: "#c0c0c0"
  },
  balance: {
    fontSize: 10,
    color: "#42c5f4"
  },
  debt: {
    fontSize: 10,
    color: "rgba(218,11,11,59)"
  }
});
