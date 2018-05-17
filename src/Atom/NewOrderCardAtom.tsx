import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Header, Icon, Right } from 'native-base';
import InputAtom from './InputAtom';
import styles from '../Style/exportStyles';

interface IProps {
    onPress: () => void
}

export default class NewOrderCardAtom extends Component<IProps, any> {
  state = {
    product: '',
    price: '',
    quantity: ''
  };
  getProduct = (product: string) => {
    this.setState({ product });
  }
  getPrice = (price: number) => {
    this.setState({ price });
  }
  getQuantity = (quantity: number) => {
    this.setState({ quantity });
  }
  render() {
    return (
      <View style={styles.newOrderContainer}>
        <Header style={styles.newOrderHeader}>
          <Right>
            <TouchableOpacity
              style={styles.newOrderClose}
              onPress={this.props.onPress}
            >
              <Icon style={styles.newOrderIcon} name='md-close' />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.newOrderInnerContainer}>
          <View style={styles.newOrderFirstInput}>
            <InputAtom
              label='Product Name'
              getValue={this.getProduct}
              contStyle={styles.marginfulInput}
            />
          </View>
          <View style={styles.newOrderSecondInput}>
            <View style={styles.newOrderHalf}>
              <InputAtom
                label='Quantity'
                getValue={this.getQuantity}
                keyboardType='numeric'
                contStyle={styles.marginfulInput}
              />
            </View>
            <View style={styles.newOrderHalf}>
              <InputAtom
                label='Price'
                getValue={this.getPrice}
                keyboardType='numeric'
                contStyle={styles.marginfulInput}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
