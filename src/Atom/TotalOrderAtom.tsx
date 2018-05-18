import * as React from 'react'
import { View, Text } from 'react-native'
import styles from './../Style/exportStyles'

interface IProps {
  totalAmount: any
  profit: any
}

export default class TotalOrderAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={styles.totalOrderColumn}>
        <View style={styles.totalOrderContainer}>
          <View style={styles.totalOrderTotalView}>
            <Text style={styles.totalOrderTotalText}>TOTAL SALES</Text>
          </View>
          <View style={styles.totalOrderRedNumberView}>
            <Text style={styles.totalOrderRedNumber}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        </View>
        <View style={styles.totalOrderContainer}>
          <View style={styles.totalOrderTotalView}>
            <Text style={styles.totalOrderTotalText}>PROFIT</Text>
          </View>
          <View style={styles.totalOrderPeachView}>
            <Text style={styles.totalOrderRedNumber}>
              NGN {this.props.profit}.00
            </Text>
          </View>
        </View>
      </View>
    )
  }
}