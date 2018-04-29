import React, { Component } from "react";
import {
  Text,
  View,
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
        height: 70
      },
      showIcon: true,
      showLabel: true
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);

export default HomeScreenTabNavigator;