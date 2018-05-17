import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AboveAccordionAtom from "../Atom/AboveAccordionAtom";
import styles from "../Style/OrderList";
import AccordionAtom from "../Atom/AccordionAtom";
import GetAmountModal from "../Container/GetAmountModal";
import ButtonAtom from "../Atom/ButtonAtom";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visibility: false,
      icon: 'md-arrow-dropdown'
    };
  }

  onHot = () => {
    if (this.state.visibility == false) {
      this.setState({ visibility: true });
    } else {
      this.setState({ visibility: false });
    }
  };
  /*
  changeIcon = () => {
    if (this.state.icon == 'md-arrow-dropdown') {
      this.setState({ visibility: true });
    } else {
      this.setState({ visibility: false });
    }
  };*/
  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <AboveAccordionAtom totalAmount="10,000" name="Ayo Aregbede" />
          <TouchableOpacity onPress={this.changeIcon}>
            <AccordionAtom icon="md-arrow-dropdown" />
          </TouchableOpacity>
          <ButtonAtom
            onPress={this.onHot}
            btnText="Pay debt"
            btnStyle={styles.compInner}
          />
          <GetAmountModal
            headerText="Pay Debt"
            visibility={this.state.visibility}
          />
        </ScrollView>
      </View>
    );
  }
}
