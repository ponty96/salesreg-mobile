import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Left, Right } from 'native-base';

import styles from './../Style/OrderList';

interface IBottomOrderDetailProps {
    total: string;
    amount: string;
    balance: string;
    dueDate: string;
}

export default class BottomOrderDetailAtom extends React.Component <IBottomOrderDetailProps, any> {
    public static defaultProps = {
        amount: '6,000',
        balance: '5,350',
        dueDate: '21-02-2018',
        total: '11,350'
    };
  render() {
    return (
        <View>
            <ListItem style={styles.redList}>
                <Left><Text style={styles.whiteTextL}>TOTAL</Text></Left>
                <Right><Text style={styles.whiteTextR}>#{this.props.total}.00</Text></Right>
            </ListItem>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.blackTextL}>Amount Pending</Text></Left>
                <Right><Text style={styles.blackTextR}>#{this.props.amount}.00</Text></Right>
            </ListItem>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.blackTextL}>Balance</Text></Left>
                <Right><Text style={styles.redTextR}>#{this.props.balance}.00</Text></Right>
            </ListItem>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.blackTextL}>Balance due date</Text></Left>
                <Right><Text style={styles.blackTextR}>{this.props.dueDate}.</Text></Right>
            </ListItem>
        </View>
    );
  }
}