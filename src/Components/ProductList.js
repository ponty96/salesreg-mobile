import React, { Component } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Icon } from 'native-base';

import ProductListAtom from "../Atom/ProductListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import styles from '../Style/ProductAndCustomerList';
import { productList } from "../config/data";


  
class ProductList extends Component {
  
    onPress = () => {
      alert("Product View Unavailable");
    }

    renderItem = ({item}) => {
      return (
        <ProductListAtom
          onPress={this.onPress}
          items = {item}
        />
      );
    }

    render() {
      return (
        <View style={styles.container}>
          <SubHeaderAtom list={["Fasting selling", "Slowest selling", "Highest profit", "Lowest profit"]}/>
            <ScrollView>
              <FlatList
                data={productList}
                renderItem={this.renderItem}
                keyExtractor={item => item.key}
              />
            </ScrollView>
        </View>
      );
    }
  }
  

  ProductList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  export default ProductList;