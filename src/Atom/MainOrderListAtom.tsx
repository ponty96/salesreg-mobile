import React from 'react';
import { View } from 'react-native';
import { ListItem, Left, Right, Text } from 'native-base';
import styles from '../Style/OrderList';
import PopoverAtom from './PopoverAtom';

interface IProps {
    items?: {orderId: number, time: string, customerName: string, amount: number, position: string, check: boolean, tag: any}
}

class MainOrderListAtom extends React.Component<IProps, any> {
  render() {
    return (
      <ListItem style={styles.mainList}>
        <Left style={styles.mainLeft}>
          <View style={styles.viewMargin}>
            <Text style={styles.leftText1}>
              {this.props.items.orderId}
              {'   '}
              <Text style={styles.wrapText}>{this.props.items.time}</Text>
            </Text>
          </View>
          <View style={styles.viewMargin}>
            <Text style={styles.leftText2}>{this.props.items.customerName}</Text>
          </View>
        </Left>
        <Right style={styles.mainRight}>
          <Text style={styles.rightText}>{this.props.items.amount}</Text>
          <PopoverAtom
            position={this.props.items.position}
            tag={this.props.items.tag}
            check={this.props.items.check}
          />
        </Right>
      </ListItem>
    );
  }
}

export default MainOrderListAtom;
