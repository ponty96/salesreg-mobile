import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
import { TabNavigator, TabBarBottom } from "react-navigation";
import { Icon } from 'native-base';

import ProductList from "./../Components/ProductList";
import OrderList from "./../Components/OrderList";
import CustomerList from "./../Components/CustomerList";
import CreditList from "./../Components/CustomerList";


const HomeScreenTabNavigator = TabNavigator(
  {
    Product: {
      screen: ProductList
    },
    Order: {
      screen: OrderList
    },
    Customer: {
      screen: CustomerList
    },
    Credits: {
      screen: CreditList
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    backgroundColor: "white",
    tabBarOptions: {
      labelStyle: { 
        fontSize: 15 
      },
      activeBackgroundColor: "white",
      inactiveBackgroundColor: "white",
      activeTintColor: "rgba(218,11,11,59)",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        height: 70,
      },
      showIcon: true,
      showLabel: true,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);

export default HomeScreenTabNavigator;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c0c0c0",
  },
  row: {
    flexDirection: "row",
    top: 0,
    padding: 10,
    height: 75,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: .5,
  },
  rowText1: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 20,
    color: 'grey',
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    color: 'red',
    paddingRight: 18,
    fontSize: 18,
  },
  part: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "rgba(218,11,11,59)",
    borderRadius: 50,
    bottom: 40,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    color: "white",
    fontSize: 15,
    marginRight: 15,
    margin: 0,
  },
  image: {
    height: 20,
    width: 20,
    padding: 6
  },
  dp: {
    height: 55,
    width: 55,
    borderRadius: 55/2,
    margin: 8,
  },
  icons: {
    backgroundColor: "#fff",
    height: 25,
    width: 25
  }
});
