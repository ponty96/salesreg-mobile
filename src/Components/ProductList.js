import React, { Component } from "react";
import {
  View,
  ListView,
} from "react-native";
import { Icon } from 'native-base';
import ProductListAtom from "../Atom/ProductListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import { ScrollView } from "react-native-gesture-handler";
import styles from '../Style/ProductAndCustomerList';
import { productList } from "../config/data";

const users = productList;

  
  export default class ProductList extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
        userDataSource: ds.cloneWithRows(users)
      };
    }
  
    static navigationOptions = {
      tabBarIcon: ({tintColor})=>(
        <Icon name="md-briefcase" style={{color: tintColor}} />
      )
    } 
  
  
    onPress = () => {
      alert("Product View Unavailable");
    };
    renderRow(user) {
      return (
        <ProductListAtom
          onPress={this.onPress}
          items = {user}
        />
      );
    }
    render() {
      return (
        <View style={styles.container}>
          <SubHeaderAtom list={["Fasting selling", "Slowest selling", "Highest profit", "Lowest profit"]}/>
            <ScrollView>
              <ListView
                dataSource={this.state.userDataSource}
                renderRow={this.renderRow.bind(this)}
              />
            </ScrollView>
        </View>
      );
    }
  }