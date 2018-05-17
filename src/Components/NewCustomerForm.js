import React from "react";
import { View, Text } from "react-native";
import CustomerFormAtom from "../Atom/CustomerFormAtom";

import SaveCancelButton from "../Container/SaveCancelButton";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../Style/OrderList";

export default class NewCustomerForm extends React.Component {
  create = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <CustomerFormAtom />
        </ScrollView>
        <SaveCancelButton
          navigation={{ fakeObject: "To stop giving errors" }}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    );
  }
}
