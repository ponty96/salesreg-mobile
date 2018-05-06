import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, ListView, ScrollView } from "react-native";
import { Icon } from 'native-base';

import ProductListAtom from "../Atom/ProductListAtom";
import SubHeaderAtom from "../Atom/SubHeaderAtom";
import styles from '../Style/ProductAndCustomerList';

class ProductList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      userDataSource: ds.cloneWithRows(this.props.items)
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

  renderRow = (user) => {
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

  ProductList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  export default ProductList;