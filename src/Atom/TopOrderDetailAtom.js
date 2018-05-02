import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Left, Right, Thumbnail } from 'native-base';

export default class TopOrderDetailAtom extends React.Component {
  render() {
    return (
        <View>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.redText}>ORDER ID</Text></Left>
                <Right><Text style={styles.redText}>233232</Text></Right>
            </ListItem>
            <ListItem style={styles.content}>
                <Left style={styles.moneyView}>
                    <Text style={styles.greyText}>Bought by</Text>
                </Left>
                <Right style={styles.pictureView}>
                    <Thumbnail source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7" }} style={styles.dp} />
                    <Text style={styles.pictureText}>Chito</Text>
                </Right>
            </ListItem>
            <ListItem style={styles.whiteList}>
                <Left><Text style={styles.greyText}>Status</Text></Left>
                <Right><Text style={styles.blackText}>Pending</Text></Right>
            </ListItem>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderTopColor: "#f0f0f0"
    },
    content: {
        height: 130,
        width: "100%",
        paddingLeft: 0,
        marginLeft: 0,
    },
    pictureView: {
      flexDirection: "column",
      width: '50%',
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    pictureText: {
      paddingTop: 10,
      fontSize: 18,
      fontWeight: "400",
      color: "grey",
    },
    greyText: {
      color: '#c0c0c0',
      fontSize: 16,
      fontWeight: '400',
      paddingLeft: 16
    },
    moneyView: {
      width: '50%',
      height: 120,
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    dp: {
        height: 45,
        width: 45,
    },
    whiteList: {
        flex: 1,
        height: 65, 
        width: "100%", 
        paddingLeft: 0,
        marginLeft: 0,
        backgroundColor: "#FFF"
    },
    blackText: {
        fontSize: 16,
        color: "#000"
    },
    redText: {
        fontSize: 16,
        color: "red",
        paddingLeft: 16
    }
  });
  