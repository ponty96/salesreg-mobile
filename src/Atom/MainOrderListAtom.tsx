<<<<<<< HEAD:src/Atom/MainOrderListAtom.js
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, ListItem, Left, Right, Text } from 'native-base'
import PropTypes from 'prop-types'

import styles from '../Style/OrderList'
import PopoverAtom from './PopoverAtom'
=======
import React from 'react';
import { View } from 'react-native';
import { ListItem, Left, Right, Text } from 'native-base';
import styles from '../Style/OrderList';
import PopoverAtom from './PopoverAtom';

interface IProps {
    items?: {orderId: number, time: string, customerName: string, amount: number, position: string, check: boolean, tag: any}
}
>>>>>>> 3b6ce905eb847d45b69771fd2118de2997533fdb:src/Atom/MainOrderListAtom.tsx

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
    )
  }
}

<<<<<<< HEAD:src/Atom/MainOrderListAtom.js
MainOrderListAtom.propTypes = {
  items: PropTypes.object.isRequired
}

export default MainOrderListAtom
=======
export default MainOrderListAtom;
>>>>>>> 3b6ce905eb847d45b69771fd2118de2997533fdb:src/Atom/MainOrderListAtom.tsx
