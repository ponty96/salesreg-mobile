import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/exportStyles'

export default class TotalDebtAtom extends React.Component {
  render() {
    let icon = this.props.limit >= 300000 ? 'md-warning' : 'md-add'
    let iconc = this.props.limit >= 300000 ? 'red' : 'transparent'
    display = () => {
      if (this.props.limit >= 300000) {
        return <Icon name={icon} style={styles.totalOrderIcon} />
      }
    }
    displayView = () => {
      if (this.props.limit <= 100000) {
        return (
          <View style={styles.totalOrderRedNumberView}>
            <Text style={styles.totalOrderRedNumber}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        )
      } else if (this.props.limit > 100000 && this.props.limit <= 299999) {
        return (
          <View style={styles.totalDebtRedNumberView1}>
            <Text style={styles.totalDebtRedNumber1}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        )
      } else {
        return (
          <View style={styles.totalDebtRedNumberView2}>
            <Text style={styles.totalDebtRedNumber1}>
              NGN {this.props.totalAmount}.00
            </Text>
          </View>
        )
      }
    }
    return (
      <View style={styles.totalDebtContainer}>
        <View style={styles.totalDebtTotalView}>
          {display()}
          <Text style={styles.totalDebtTotalText}> TOTAL</Text>
        </View>
        {displayView()}
      </View>
    )
  }
}
