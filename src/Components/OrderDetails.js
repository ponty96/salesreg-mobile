import React, { Component } from "react";
import { Text, View, StyleSheet, ListView, Image, TouchableOpacity } from "react-native";
import { Icon, Header, Right, ListItem } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import OrderDetailListAtom from "../Atom/OrderDetailListAtom";
import TopOrderDetailAtom from "../Atom/TopOrderDetailAtom";
import BottomOrderDetailAtom from "../Atom/BottomOrderDetailAtom";
import ButtonAtom from "../Atom/ButtonAtom";
import styles from "../Style/OrderList";
import { orderDetails } from "../config/data";

const users = orderDetails;
  
  export default class OrderDetails extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
        userDataSource: ds.cloneWithRows(users)
      };
    }
    
    onPress = () => {};
  
    renderRow(user) {
      return (
        <OrderDetailListAtom
          items={user}
        />
      );
    }
  
    render() {
      return (
        <View style={styles.containerDetails}>
            <ScrollView>
              <TopOrderDetailAtom />
                <ListView
                    dataSource={this.state.userDataSource}
                    renderRow={this.renderRow.bind(this)}
                />
              <BottomOrderDetailAtom /> 
            </ScrollView>
            <View style={styles.footerDetails}>
                <ButtonAtom 
                  btnText="Cancel Order" 
                  transparent={true} 
                  btnStyle={styles.butt} 
                  textStyle={styles.textyy} />
            </View>
        </View>
      );
    }
  }