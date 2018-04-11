import React, { Component } from "react";
/*import {
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
*/
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
import styles from './../Style/List';

class CustomerListAtom extends Component {


  
  render() {
    const defaultImg = require('./../Images/default.jpg');
    const avatar = this.props.items.image ? this.props.items.image : defaultImg;
    var paid = "paid";
    var balance = "balance";
    return (
      <ListItem style={styles.row} onPress={this.onPress}>
        <Left style={styles.view1}>
          <Thumbnail source={{ uri: avatar }} style={styles.dp} />
        </Left>
        <Body style={styles.view2}>
          <Text style={styles.rowText1}>{this.props.customerName}</Text>
        </Body>
        <Right style={styles.view3}>
          <Text style={styles.text1}>N {this.props.amount}</Text>
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
