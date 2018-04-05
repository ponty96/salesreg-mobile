import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from 'native-base';

class ProductlistItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.row}>
          <View style={{alignSelf: "flex-start", alignItems: "center", width: "25%"}}><Image source={{ uri: this.props.images }} style={styles.dp} /></View>
          <View style={{ width: "50%"}}><Text style={styles.rowText1}>{this.props.name}</Text></View>
          <View style={{alignSelf: "flex-end", width: "25%"}}><Text style={styles.rowText3}> {this.props.number}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductlistItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c0c0c0",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    height: 75,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 0.5,

  },
  rowText1: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    color: '#000',
    marginTop: 30,
    textAlign: 'left'
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 30,
    paddingRight: 15
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
