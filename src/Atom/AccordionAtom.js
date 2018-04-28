import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Left, Right } from 'native-base';
import PropTypes from "prop-types";
import Accordion from 'react-native-collapsible/Accordion';

import DebtAccordionAtom from './DebtAccordionAtom';
import { ScrollView } from 'react-native-gesture-handler';

const SECTIONS = [
  {
    orderId: 1112343,
    customerName: "Salomy",
    date: "03-10-2018",
    time: "02:00pm",
    amount: 20,
    debt: 2000,
    position: "bottom",
    tag: "Delivered",
    check: false
  },
  {
    orderId: 1226389,
    customerName: "Mummy Ella",
    date: "14-09-2018",
    time: "11:57pm",
    amount: 3,
    debt: 1500,
    position: "bottom",
    tag: "Delivered",
    check: false
  },
  {
    orderId: 5363782,
    customerName: "Mr David",
    date: "11-09-2018",
    time: "10:00am",
    amount: 1,
    debt: 3000,
    position: "bottom",
    tag: "Pending",
    check: false
  },
  {
    orderId: 1164897,
    customerName: "Klazbaba",
    date: "08-08-2018",
    time: "09:31am",
    amount: 10,
    debt: 4500,
    position: "bottom",
    tag: "Delivered | Recalled",
    check: true
  },
];

  

export default class AccordionAtom extends Component {
  constructor() {
    super();
    this.state = {
      icon: "md-arrow-dropdown",
    };
  }

  onHot = () => {
    if (this.state.icon == "md-arrow-dropdown"){
      this.setState({
        icon: "md-arrow-dropup",
      });
  } else if (this.state.icon == "md-arrow-dropup"){
    this.setState({
      icon: "md-arrow-dropdown",
    });
  }
  }
  _renderHeader(section) {
    return (
      <View style={{ flex: 1, flexDirection: "row", height: 75, width: "100%", alignSelf: "center", marginRight: 10, backgroundColor: "#fff", paddingVertical: 8, borderBottomColor:"#f0f0f0", borderBottomWidth: 1}}>
        <View style={{flex: 1, flexDirection: "column", width: "40%", marginLeft: 0, paddingLeft: 0, height: 75}}>
            <View style={{marginLeft: 16}}>
              <Text style={{textAlign: "left", paddingBottom: 10, paddingLeft: 5, marginLeft: 0, fontWeight: "400"}}>{section.orderId}{'   '}<Text style={{fontSize: 13, color: "#000", fontWeight: "400"}}>{section.date}</Text></Text>
            </View>
            <View style={{marginLeft: 16}}>
              <Text style={{textAlign: "left", paddingTop: 10, paddingLeft: 5, marginLeft:0, fontSize: 13, color: "red"}}>#{section.debt}.00</Text>
            </View>
        </View>
        <View style={{flex: 1, flexDirection: "column", marginRight: 16, marginLeft: "20%", width: "40%", height: 75, alignItems: "flex-end"}}>
            <Text style={{fontWeight: "500", fontSize: 13, paddingTop: 5, paddingBottom: 8}}>{section.amount}</Text>
            <Icon style={{paddingTop: 4, color: "#c0c0c0" }} name="md-arrow-dropdown" />
        </View>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <DebtAccordionAtom />
    );
  }

  render() {
    return (
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </ScrollView>
    );
  }
}
