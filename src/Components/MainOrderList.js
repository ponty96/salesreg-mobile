import React, { Component } from "react";
import { View, StyleSheet, ListView } from "react-native";
import { Font, AppLoading } from "expo";
import { Root, Icon, Button, Right, Header, Text } from 'native-base';
import MainOrderListAtom from "../Atom/MainOrderListAtom";
import { ScrollView } from "react-native-gesture-handler";

const users = [
    {
      orderId: 1112343,
      customerName: "Salomy",
      date: "19 March 2018",
      time: "02:00pm",
      amount: 20,
      position: "bottom",
      tag: "Delivered",
      check: false
    },
    {
      orderId: 1226389,
      customerName: "Mummy Ella",
      date: "19 March 2018",
      time: "11:57pm",
      amount: 3,
      position: "bottom",
      tag: "Delivered",
      check: false
    },
    {
      orderId: 5363782,
      customerName: "Mr David",
      date: "19 March 2018",
      time: "10:00am",
      amount: 1,
      position: "bottom",
      tag: "Pending",
      check: false
    },
    {
      orderId: 1164897,
      customerName: "Klazbaba",
      date: "19 March 2018",
      time: "09:31am",
      amount: 10,
      position: "bottom",
      tag: "Delivered | Recalled",
      check: true
    },
    {
      orderId: 7588581,
      customerName: "Mummy Ella",
      date: "20 March 2018",
      time: "08:46am",
      amount: 5,
      position: "bottom",
      tag: "Pending delivery",
      check: false
    },
    {
      orderId: 2783993,
      customerName: "Salomy",
      date: "19 March 2018",
      time: "08:46am",
      amount: 20,
      position: "top",
      tag: "Delivered",
      check: false
    },
    {
      orderId: 3773773,
      customerName: "Salomy",
      date: "19 March 2018",
      time: "08:46am",
      amount: 7,
      position: "top",
      tag: "Pending Delivery",
      check: false
    },
    
  ];

  
  export default class MainOrderList extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
        userDataSource: ds.cloneWithRows(users),
        loading: true
      };
    }
   
    async componentWillMount() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ loading: false });
    }

    renderRow(user) {
      return(
        <MainOrderListAtom
        orderId={user.orderId}
        time={user.time}
        customerName={user.customerName}
        amount={user.amount}
        position={user.position}
        tag={user.tag}
        check={user.check}
        />
      );
    }
    render() {
      if (this.state.loading) {
        return (
          <Root>
            <AppLoading />
          </Root>
        );
      }
      return (
        <View style={styles.container}>
          <Header style={{backgroundColor: "#fff", width: "100%"}}>
              <Right style={{flexDirection: "row"}}><Button transparent><Text uppercase={false} style={{color: "#000", fontSize: 20}}>View Products</Text><Icon style={{color: "#000", marginBottom: 8}} name= "md-arrow-forward"/></Button></Right>
          </Header>
            <ScrollView>
              <ListView
                style={styles.listView}
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
        backgroundColor: "#FFF",
        flex: 1,
        width: "100%"
    },
    listView: {
      paddingVertical: 10
    }
  });
