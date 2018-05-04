import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Left, Right } from 'native-base';
import styles from '../Style/ProductAndCustomerList';
import PropTypes from "prop-types";

class OrderDetailListAtom extends React.Component {
  render() {
    return (
        <ListItem style={styles.row}>
            <Left>
                <Text style={styles.leftText}>{this.props.items.name}</Text>
            </Left>
            <Right>
                <Text style={styles.rightText1}>{this.props.items.number}</Text>
                <Text style={styles.rightText2}>#{this.props.items.amount}.00</Text>
            </Right>
        </ListItem>
    );
  }
}

OrderDetailListAtom.propTypes = {
    items: PropTypes.object.isRequired
};  

export default OrderDetailListAtom;