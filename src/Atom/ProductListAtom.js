import React, { Component } from "react";
/*import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";*/
import { ListItem, Left, Body, Right, Text, Thumbnail } from "native-base";
import PropTypes from "prop-types";
import styles from "./../Style/List";

class ProductlistAtom extends React.Component {
  render() {
    const defaultImg = require("./../Images/default.jpg");
    const avatar = this.props.items.image ? this.props.items.image : defaultImg;

    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left
          style={{
            alignSelf: "flex-start",
            alignItems: "center",
            width: "25%"
          }}
        >
          <Thumbnail
            source={{ uri: this.props.items.images }}
            style={styles.dp}
          />
        </Left>
        <Body style={{ width: "50%" }}>
          <Text style={styles.rowText1}>{this.props.name}</Text>
        </Body>
        <Right style={{ alignSelf: "flex-end", width: "25%" }}>
          <Text style={styles.rowText3}> {this.props.number}</Text>
        </Right>
      </ListItem>
    );
  }
}

ProductListAtom.propTypes = {
  items: PropTypes.object.isRequired
};

export default ProductlistAtom;

/*const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c0c0c0"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    height: 75,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 0.5
  },
  rowText1: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    color: "#000",
    marginTop: 30,
    textAlign: "left"
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    color: "red",
    fontSize: 13,
    textAlign: "right",
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
    borderRadius: 55 / 2,
    margin: 8
  },
  icons: {
    backgroundColor: "#fff",
    height: 25,
    width: 25
  }
});*/
