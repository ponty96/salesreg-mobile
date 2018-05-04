import React from "react";
import { StyleSheet, View, Text } from "react-native";

import AboveAccordionAtom from "../Atom/AboveAccordionAtom";
import styles from "../Style/OrderList";
import AccordionAtom from "../Atom/AccordionAtom";
import GetAmountModal from "../Container/GetAmountModal";
import { ScrollView } from "react-native-gesture-handler";
import ButtonAtom from "../Atom/ButtonAtom";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visibility: false
    };
  }

  onHot = () => {
    if (this.state.visibility == false) {
      this.setState({ visibility: true });
    } else {
      this.setState({ visibility: false });
    }
  };
  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <AboveAccordionAtom totalAmount="10,000" name="Ayo Aregbede" />
          <AccordionAtom />
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
