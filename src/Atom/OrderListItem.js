import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

class OrderListItem extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.row}>
            <View style={styles.view1}>
              <Image source={{ uri: this.props.images }} style={styles.dp} />
            </View>
            <View style={styles.view2}>
              <Text style={styles.rowText1}>{this.props.name}</Text>

              <Text style={styles.rowText2}>{this.props.customerName}</Text>
            </View>
            <View style={styles.view3}>
              <Text style={styles.rowText3}>
                {this.props.number}</Text>
                <Text style={styles.rowText2}>{this.props.time} </Text>
              
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

export default OrderListItem;

const styles = StyleSheet.create({
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
      color: "grey"
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
      width: "20%", 
      alignItems: "center"
    },
    view2: {
      flexDirection: "column", 
      width:"60%"
    },
    view3: {
        flexDirection: "column",
        alignItems: "flex-end",
        width: "20%",
    }
  });

       
