import React, { Component } from 'react';
import { ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base';
import styles from './../Style/ProductAndCustomerList';

interface IProps {
    items: { images: string, customerName: string, amount: any, date: string };
    limit: number;
    onPress: () => void;
}

class DebtListAtom extends Component<IProps, any> {
    display = () => {
        if (this.props.limit >= 200000) {
          return (
            <Text style={styles.rowText1D}>{this.props.items.customerName}</Text>
          );
        } else {
          return (
          <Text style={styles.rowText1}>{this.props.items.customerName}</Text>
          );
        }
      }
  render() {
    const defaultImg = 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar = this.props.items.images !== '' ? this.props.items.images : defaultImg;

    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left style={styles.view1}>
          <Thumbnail source={{ uri: avatar }} style={styles.dp} />
        </Left>
        <Body style={styles.view2}>
          {
            this.display()
          }
        </Body>
        <Right style={styles.view3}>
          <Text style={styles.rowText3D}>N {this.props.items.amount}.00</Text>
          <Text style={styles.lilFontD}>{this.props.items.date}</Text>
        </Right>
      </ListItem>
    );
  }
}

export default DebtListAtom;
