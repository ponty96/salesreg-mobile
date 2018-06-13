import * as React from 'react';
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  items?: {
    images: string;
    name: string;
    customerName: string;
    number: number;
    amount: any;
  };
  onPress?: () => void;
}

class OrderListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar = this.props.items.images
      ? this.props.items.images
      : defaultImg;

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
          <Text style={styles.rowText3}>{this.props.items.number}</Text>
          <Text style={styles.rowText2}>
            &#8358; {this.props.items.amount}.00
          </Text>
        </Right>
      </ListItem>
    );
  }
}

export default OrderListAtom;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 0,
    marginLeft: 0,
    top: 0,
    padding: 10,
    width: '100%',
    height: 75,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  rowText1: {
    flex: 1,
    fontWeight: '500',
    fontSize: 12
    // color: '#000'
  },
  rowText2: {
    flex: 1,
    fontSize: 13,
    paddingTop: 12,
    color: color.primary
  },
  rowText3: {
    fontSize: 12
  },
  view1: {
    height: 68,
    alignItems: 'center',
    marginRight: 0,
    paddingRight: 0
  },
  view2: {
    flexDirection: 'column',
    flex: 0,
    paddingLeft: 0,
    marginLeft: 0,
    width: '50%'
  },
  view3: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '20%',
    marginLeft: '10%'
  },
  dp: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    margin: 8
  }
});
