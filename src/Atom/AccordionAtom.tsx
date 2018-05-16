import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import Accordion from 'react-native-collapsible';
import DebtAccordionAtom from './DebtAccordionAtom';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Style/OrderList';
import { sections } from '../config/data';

const SECTIONS = sections;

interface IAccordProps {
  icon: string
}
interface IAccordState {
  activeSection: boolean
  icon: string
}
const namer = 'md-arrow-dropdown';

export default class AccordionAtom extends Component<IAccordProps, IAccordState> {
  constructor(props?: IAccordProps, context?: any) {
    super(props, context);
    this.state = {
      activeSection: false,
      icon: 'md-arrow-dropdown'
    };
  }
  _setHeader (section: any) {
    const { icon } = this.state;
    this._loadHeader(icon);
    this.setState({activeSection: section});
  }
  _loadHeader = (icon: string) => {
    if (icon === 'md-arrow-dropdown') {
    this.setState({icon: 'md-arrow-dropup'});
    } else {
      this.setState({icon: 'md-arrow-dropdown'});
    }
  }
  _renderHeader(section: any) {
    return (
      <View style={styles.mainAccord}>
        <View style={styles.accordView1}>
            <View style={styles.viewMargin}>
              <Text style={styles.accordTextL1}>{section.orderId}{'   '}<Text style={styles.wrapAccordText}>{section.date}</Text></Text>
            </View>
            <View style={styles.viewMargin}>
              <Text style={styles.accordTextL2}>#{section.debt}.00</Text>
            </View>
        </View>
        <View style={styles.accordView2}>
            <Text style={styles.accordTextR}>{section.amount}</Text>
            <Icon style={styles.accordIcon} name={this.state.icon || namer} />
        </View>
      </View>
    );
  }

  _renderContent() {
    return (
      <DebtAccordionAtom />
    );
  }

  render() {
    return (
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSection={this.state.activeSection}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._setHeader.bind(this)}
        />
      </ScrollView>
    );
  }
}
