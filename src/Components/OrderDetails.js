import React, { Component } from "react";
import { Text, View, StyleSheet, ListView, Image, TouchableOpacity } from "react-native";
import { Icon, Header, Right, ListItem } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import OrderDetailListAtom from "../Atom/OrderDetailListAtom";
import TopOrderDetailAtom from "../Atom/TopOrderDetailAtom";
import BottomOrderDetailAtom from "../Atom/BottomOrderDetailAtom";
import ButtonAtom from "../Atom/ButtonAtom";

const users = [
    {
      name: "Ankara Top Shelfs",
      date: "19-03-2018",
      amount: "12,000",
      number: 4,
      debt: "3,000",
      status: "debt",
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
    },
    {
      name: "Black Sandals",
      date: "19-03-2018",
      amount: "12,000",
      number: 2,
      debt: "0",
      status: "paid",
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
    },
    {
      name: "Perfumes for both Sexes",
      date: "19-03-2018",
      amount: "3,500",
      number: 36,
      debt: "0",
      status: "balance",
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
    }
  ];
  
  export default class OrderDetails extends Component {
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
        <OrderDetailListAtom
          items={user}
        />
      );
    }
  
    render() {
      return (
        <View style={styles.container}>
            <ScrollView>
              <TopOrderDetailAtom />
                <ListView
                    dataSource={this.state.userDataSource}
                    renderRow={this.renderRow.bind(this)}
                />
              <BottomOrderDetailAtom /> 
            </ScrollView>
            <View style={styles.footer}>
                <ButtonAtom 
                  btnText="Cancel Order" 
                  transparent={true} 
                  btnStyle={{
                    borderWidth:1,
                    borderColor: "darkgrey",
                    borderRadius: 2,
                    marginVertical: 12
                  }} 
                  textStyle={{
                    color: "darkgrey",
                    fontSize: 16
                  }} />
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      flex: 1,
      width: "100%",
      alignSelf: "center"
    },
    footer: {
      height: 70,
      width: "100%"
    }
   });
  