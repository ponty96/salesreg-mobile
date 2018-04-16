import React from "react";
/*import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";*/
import { ListItem, Left, Body, Right, Text, Thumbnail } from "native-base";
import PropTypes from "prop-types";
import styles from "./../Style/List";

class OrderListAtom extends React.Component {
  render() {
    const defaultImg = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7";
    const avatar = this.props.items.image ? this.props.items.image : defaultImg;

    return (
          <ListItem style={styles.row} onPress={this.props.onPress}>
            <Left style={styles.view1}>
              <Thumbnail source={{ uri: avatar }} style={styles.dp} />
            </Left>
            <Body style={styles.view2}>
              <Text style={styles.rowText1}>{this.props.name}</Text>

              <Text style={styles.rowText2}>{this.props.customerName}</Text>
            </Body>
            <Right style={styles.view3}>
              <Text style={styles.rowText3}>
                {this.props.number}</Text>
                <Text style={styles.rowText2}>{this.props.time}</Text>
              
            </Right>
          </ListItem>
    );
  }
}

OrderListAtom.propTypes = {
  items: PropTypes.object.isRequired
};

export default OrderListAtom;

/*const styles = StyleSheet.create({
    container: {
      backgroundColor: "#c0c0c0",
    },
    row: {
      flex: 1,
      flexDirection: "row",
      top: 0,
      padding: 10,
      height: 75,
      width: "100%",
      alignItems: "center",
      backgroundColor: "#fff",
      marginBottom: 0.5
    },
    rowText1: {
      fontWeight: "bold",
      fontSize: 12,
      color: "#000"
    },
    rowText2: {
      color: "lightgrey",
      fontSize: 10
    },
    rowText3: {
      color: "red",
      textAlign: "right",
      fontSize: 13
    },
    image: {
      height: 20,
      width: 20,
      padding: 6,
    },
    dp: {
      height: 55,
      width: 55,
      borderRadius: 55 / 2,
      margin: 8,
    },
    icons: {
      backgroundColor: "#fff",
      height: 25,
      width: 25,
    },
    view1: { 
      height: 68, 
      width: "25%", 
      alignItems: "center"
    },
    view2: {
      flexDirection: "column", 
      width:"55%"
    },
    view3: {
        flexDirection: "column",
        alignItems: "flex-end",
        width: "20%",
    }
  });*/

       
