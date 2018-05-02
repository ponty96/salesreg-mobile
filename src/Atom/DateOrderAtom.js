import React from "react";
import { StyleSheet, View, Text } from "react-native";

import styles from './../Style/Layout';

export default class DateOrderAtom extends React.Component {
  render() {
    return (
      <View style={styles.dateOrderContainer}>
        <Text style={styles.dateText}>{this.props.date}</Text>
      </View>
    );
  }
}