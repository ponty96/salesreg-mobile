import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Left, Right } from 'native-base';

import styles from './../Style/OrderList';

export default class BottomOrderDetailAtom extends React.Component {
  render() {
    return (
        <View>
            <ListItem style={styles.redList}>
                <Left><Text style={styles.whiteTextL}>TOTAL</Text></Left>
                <Right><Text style={styles.whiteTextR}>#11,350.00</Text></Right>
            </ListItem>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.blackTextL}>Amount Pending</Text></Left>
                <Right><Text style={styles.blackTextR}>#6,000.00</Text></Right>
            </ListItem>
            <ListItem style={styles.whiteList}> 
                <Left><Text style={styles.blackTextL}>Balance</Text></Left>
                <Right><Text style={styles.redTextR}>#5,350.00</Text></Right>
            </ListItem>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.blackTextL}>Balance due date</Text></Left>
                <Right><Text style={styles.blackTextR}>02-21-2018</Text></Right>
            </ListItem>
        </View>
    );
  }
}