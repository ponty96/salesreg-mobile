import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Left, Body, Right, Text, Thumbnail } from "native-base";
import PropTypes from "prop-types";
//import styles from "./../Style/List";

class ProductListAtom extends React.Component {
  render() {
    const defaultImg = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7";
    const avatar = this.props.items.image ? this.props.items.image : defaultImg;

    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left
          style={styles.leftView}
        >
          <Thumbnail
            source={{ uri: avatar }}
            style={styles.dp}
          />
        </Left>
        <Body style={styles.bodyView}>
          <Text style={styles.rowText1}>{this.props.items.name}</Text>
        </Body>
        <Right style={styles.rightView}>
          <Text style={styles.rowText3}> {this.props.items.number}</Text>
        </Right>
      </ListItem>
    );
  }
}

ProductListAtom.propTypes = {
  items: PropTypes.object.isRequired
};

export default ProductListAtom;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    height: 75,
    paddingLeft: 0,
    marginLeft: 0,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 0.5
  },
  rowText1: {
    fontWeight: "200",
    fontSize: 13,
    color: "#000",
    textAlign: "left"
  },
  rowText3: {
    color: "red",
    fontSize: 13,
    textAlign: "right",
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  dp: {
    flex: 1,
    flexGrow: 1,
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 55 / 2,
    margin: 8,
    marginBottom: 15
  },
  leftView: {
    height: 55,
    paddingBottom: 30
  },
  bodyView: {
    flex: 0, 
    width: "55%" 
  }, 
  rightView: { 
    alignSelf: "flex-end", 
    width: "25%", 
    marginLeft: "20%", 
    alignItems: "center"
  },
});
