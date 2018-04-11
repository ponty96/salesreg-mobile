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
          <Image source={{ uri: this.props.images }} style={styles.dp} />
          <Text style={styles.rowText1}>{this.props.name}</Text>
          <Text style={styles.rowText3}> {this.props.number}</Text>
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
    fontSize: 12,
    paddingLeft: 20,
    color: 'grey',
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    color: 'red',
    paddingRight: 18,
    fontSize: 13,
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
