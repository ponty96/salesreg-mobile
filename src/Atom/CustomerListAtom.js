import React, { Component } from "react";
import { StyleSheet, } from "react-native";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right
} from "native-base";
//import styles from './../Style/List';

class CustomerListAtom extends Component {


  
  render() {
    const defaultImg = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7";
    const avatar = this.props.items.image ? this.props.items.image : defaultImg;
    var paid = "paid";
    var balance = "balance";
    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left style={styles.view1}>
          <Thumbnail source={{ uri: avatar }} style={styles.dp} />
        </Left>
        <Body style={styles.view2}>
          <Text style={styles.rowText1}>{this.props.items.customerName}</Text>
        </Body>
        <Right style={styles.view3}>
          <Text style={styles.text1}>N {this.props.items.amount}</Text>
          <Text
            style={[
              styles.lilFont,
              this.props.realStyle == paid
                ? styles.paid
                : this.props.realStyle == balance
                  ? styles.balance
                  : styles.debt
            ]}
          >
            {this.props.latestAmount}
          </Text>
        </Right>
      </ListItem>
    );
  }
}

CustomerListAtom.propTypes = {
  items: PropTypes.object.isRequired,
};

export default CustomerListAtom;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    top: 0,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 0,
    height: 75,
    backgroundColor: "#fff",
    marginBottom: 0.5,
    borderBottomWidth: .5,
    borderBottomColor: "#c0c0c0",
  },
  rowText1: {
    fontWeight: "200",
    fontSize: 13,
    color: "#000",
    textAlign: "left"
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    color: "#000",
    paddingRight: 18,
    fontSize: 13
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
  },
  lilFont: {
    fontSize: 11
  },
  paid: {
    fontSize: 10,
    color: "#c0c0c0"
  },
  balance: {
    fontSize: 10,
    color: "#42c5f4"
  },
  debt: {
    fontSize: 10,
    color: "rgba(218,11,11,59)"
  },
  view1: {
    height: 68,
    width: "40%",
    alignItems: "center"
  },
  view2: {
    flex: 1,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    width: "70%"
  },
  view3: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    width: "70%",
    marginLeft: "20%",
  },
  text1: {
    fontSize: 13,
    fontWeight: "200"
  }
});