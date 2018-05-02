import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Left, Right } from 'native-base';

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        width: "100%",
    },
    redList: {
        height: 65, 
        width: "100%", 
        backgroundColor: "red",
        paddingLeft: 0,
        marginLeft: 0,
    },
    whiteTextL: {
        fontSize: 16,
        color: "#FFF",
        paddingLeft: 16
    },
    whiteTextR: {
        fontSize: 16,
        color: "#FFF"
    },
    whiteList: {
        height: 65, 
        width: "100%", 
        backgroundColor: "#FFF",
        paddingLeft: 0,
        marginLeft: 0,
    },
    blackTextL: {
        fontSize: 16,
        color: "#c0c0c0",
        paddingLeft: 16
    },
    blackTextR: {
        fontSize: 16,
        color: "#000",
    },
    redTextR: {
        fontSize: 16,
        color: "red",
    },
    greyText: {
        fontSize: 16,
        color: "#c0c0c0",
        paddingLeft: 16
    },
    redText: {
        fontSize: 16,
        color: "red"
    }
   });
  