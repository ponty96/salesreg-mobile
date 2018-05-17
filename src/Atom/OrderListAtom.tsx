import React from 'react';
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import styles from './../Style/OrderList';

interface IProps {
    items?: {images: string, name: string, customerName: string, number: number, amount: any}
    onPress?: () => void
}

class OrderListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg = 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar = this.props.items.images ? this.props.items.images : defaultImg;

    return (
          <ListItem style={styles.row} onPress={this.props.onPress}>
            <Left style={styles.view1}>
              <Thumbnail source={{ uri: avatar }} style={styles.dp} />
            </Left>
            <Body style={styles.view2}>
              <Text style={styles.rowText1}>{this.props.items.name}</Text>
              <Text style={styles.rowText3}>{this.props.items.customerName}</Text>
            </Body>
            <Right style={styles.view3}>
              <Text style={styles.rowText3}>
                {this.props.items.number}</Text>
                <Text style={styles.rowText2}>N {this.props.items.amount}.00</Text>
            </Right>
          </ListItem>
    );
  }
}

export default OrderListAtom;