import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, ListItem, Left, Right, Text } from 'native-base'
import PropTypes from 'prop-types'

import styles from '../Style/OrderList'
import PopoverAtom from './PopoverAtom'

class MainOrderListAtom extends React.Component {
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
            <Text style={styles.leftText2}>
              {this.props.items.customerName}
            </Text>
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

MainOrderListAtom.propTypes = {
  items: PropTypes.object.isRequired
}

export default MainOrderListAtom
