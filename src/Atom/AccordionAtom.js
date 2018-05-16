import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Left, Right } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from "prop-types";
import Accordion from 'react-native-collapsible/Accordion';

import DebtAccordionAtom from './DebtAccordionAtom';
import styles from "../Style/OrderList";
import { sections } from '../config/data';

const SECTIONS = sections;

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
      <View style={styles.mainAccord}>
        <View style={styles.accordView1}>
            <View style={styles.viewMargin}>
              <Text style={styles.accordTextL1}>{section.orderId}{'   '}<Text style={styles.wrapAccordText}>{section.date}</Text></Text>
            </View>
            <View style={styles.viewMargin}>
              <Text style={accordTextL2}>#{section.debt}.00</Text>
            </View>
        </View>
        <View style={styles.accordView2}>
            <Text style={styles.accordTextR}>{section.amount}</Text>
            <Icon style={styles.accordIcon} name="md-arrow-dropdown" />
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
