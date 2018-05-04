import React, { Component } from "react";
import { Text, View, ListView, FlatList, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

import { orderListStyles } from './../Style/exportStyles';
import DateOrderAtom from "../Atom/DateOrderAtom";
import TotalOrderAtom from "../Atom/TotalOrderAtom";
import OrderListAtom from "../Atom/OrderListAtom";
import { orderList } from "../config/data";

export default class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      data: orderList,
      stickyHeaderIndices: []
    };
  }

  componentDidMount() {
    var arr = [];
    this.state.data.map(obj => {
      if (obj.header == "start") {
        arr.push(this.state.data.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      stickyHeaderIndices: arr
    });
  }

  renderItem = ({item}) => {
    if (item.header == "start") {
      return <DateOrderAtom date={item.date} />;
    } else if (item.header == "middle") {
      return (
        <OrderListAtom
          onPress={this.onPress}
          items={item}
        />
      );
    } else if (item.header == "end") {
      return <TotalOrderAtom totalAmount={item.amount} />;
    }
  };

  render() {
    return (
      <View style={orderListStyles.container}>
        <FlatList
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: false });
          }}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.key}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
      </View>
    );
  }
}