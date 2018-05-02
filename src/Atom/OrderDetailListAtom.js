import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Left, Right } from 'native-base';
import styles from '../Style/ProductAndCustomerList';

class OrderDetailListAtom extends React.Component {
  render() {
    return (
        <ListItem style={styles.row}>
            <Left style={{}}>
                <Text style={{color: "#c0c0c0", fontSize: 16, fontWeight:"400", textAlign: "left", paddingLeft: 16}}>{this.props.items.name}</Text>
            </Left>
            <Right style={{}}>
                <Text style={{color: "#000", fontSize: 14, paddingBottom: 8}}>{this.props.items.number}</Text>
                <Text style={{color: "red", fontSize: 14, paddingTop: 8}}>#{this.props.items.amount}.00</Text>
            </Right>
        </ListItem>
    );
  }
}

export default OrderDetailListAtom;