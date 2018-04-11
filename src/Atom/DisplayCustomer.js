import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";

class DisplayCustomer extends Component {
  
    componentWillMount() {
      /*let latestAmount = this.props.status == "paid"
    ? this.props.debt
    : this.props.status == "balance" ? this.props.balance : this.props.debt;*/
  
      /*let realColor = (this.props.status == "paid") ? "#c0c0c0" : (this.props.status == "balance") ? "#42c5f4" : "rgba(218,11,11,59)";*/
    }
  
    render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.row}>
          <View style={styles.view1}>
            <Image source={{ uri: this.props.images }} style={styles.dp} />
          </View>
          <View style={styles.view2}>
            <Text style={styles.rowText1}>{this.props.customerName}</Text>
          </View>
          <View style={styles.view3}>
            <Text style={styles.text1}>N {this.props.amount}.00</Text>
            <Text style={styles.lilFont}>
              {this.props.latestAmount}.00
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default DisplayCustomer;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#c0c0c0"
    },
    row: {
      flexDirection: "row",
      top: 0,
      padding: 10,
      height: 75,
      alignItems: "center",
      backgroundColor: "#fff",
      marginBottom: 0.5,
      borderBottomWidth: .5,
      borderBottomColor: "#c0c0c0",
    },
    rowText1: {
      flex: 1,
      fontWeight: "bold",
      fontSize: 13,
      paddingLeft: 20,
      paddingTop: 15,
      color: "#000"
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
      fontSize: 10,
      color: this.props.realColor
    },
    view1: { 
      height: 68, 
      width: "20%", 
      alignItems: "center" 
    },
    view2: { 
      flexDirection: "column", 
      width: "50%", 
    },
    view3: {
        flexDirection: "column",
        alignItems: "flex-end",
        width: "30%"
    },
    text1: {
        fontSize: 12, 
        fontWeight: "bold"
    }
  });