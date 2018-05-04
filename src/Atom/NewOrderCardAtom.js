import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import InputAtom from "./InputAtom";
import { Header, Icon, Right } from "native-base";
import { marginfulInput, marginlessInput, newOrderCard } from "./../Style/exportStyles";
import PropTypes from "prop-types";

export default class NewOrderCardAtom extends Component {
  state = {
    product: "",
    price: "",
    quantity: ""
  };
  getProduct = product => {
    this.setState({ product });
  };
  getPrice = price => {
    this.setState({ price });
  };
  getQuantity = quantity => {
    this.setState({ quantity });
  };
  render() {
    return (
      <View style={newOrderCard.container}>
        <Header style={newOrderCard.header}>
          <Right>
            <TouchableOpacity
              style={newOrderCard.close}
              onPress={this.props.onPress}
            >
              <Icon style={newOrderCard.icon} name="md-close" />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={newOrderCard.innerContainer}>
          <View style={newOrderCard.firstInput}>
            <InputAtom
              label="Product Name"
              getValue={this.getProduct}
              contStyle={marginfulInput}
            />
          </View>
          <View style={newOrderCard.secondInput}>
            <View style={newOrderCard.half}>
              <InputAtom
                label="Quantity"
                getValue={this.getQuantity}
                keyboardType="numeric"
                contStyle={marginfulInput}
              />
            </View>
            <View style={newOrderCard.half}>
              <InputAtom
                label="Price"
                getValue={this.getPrice}
                keyboardType="numeric"
                contStyle={marginfulInput}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

NewOrderCardAtom.propTypes = {
  onPress: PropTypes.func
};  
