import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styles from './../Style/exportStyles'
import { color } from '../Style/Color'

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

const styles = StyleSheet.create({
  totalOrderRedNumberView: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.totalSales
  },
  totalOrderRedNumber: {
    color: color.primary,
    fontSize: 18,
    fontWeight: 'bold'
  },
  totalOrderTotalText: {
    fontSize: 14,
    fontWeight: '400'
    // color: '#000',
  },
  totalOrderPeachView: {
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.totalProfit
  },
  totalOrderTotalView: {
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: '#fff',
  },
  totalOrderContainer: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: color.listBorderColor
  },
  totalOrderColumn: {
    borderBottomWidth: 1,
    borderBottomColor: color.primary
  }
})
