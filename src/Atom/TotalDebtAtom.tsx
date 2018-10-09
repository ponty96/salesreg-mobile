import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  limit: number
  totalAmount: any
}

// let limit = this.props.limit ? this.props.limit : 0;
let limit = 0
let icon = limit >= 300000 ? 'md-warning' : 'md-add'
// let iconc = this.props.limit >= 300000 ? 'red' : 'transparent';

export default class TotalDebtAtom extends React.Component<IProps, any> {
  display = (): any => {
    if (this.props.limit >= 300000) {
      return <Icon name={icon} style={styles.totalOrderIcon} />
    }
  }
  displayView = () => {
    if (this.props.limit <= 100000) {
      return (
        <View style={styles.totalOrderRedNumberView}>
          <Text style={styles.totalOrderRedNumber}>
            {'\u20A6'} {this.props.totalAmount}.00
          </Text>
        </View>
      )
    } else if (this.props.limit > 100000 && this.props.limit <= 299999) {
      return (
        <View style={styles.totalDebtRedNumberView1}>
          <Text style={styles.totalDebtRedNumber1}>
            {'\u20A6'} {this.props.totalAmount}.00
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.totalDebtRedNumberView2}>
          <Text style={styles.totalDebtRedNumber1}>
            {'\u20A6'} {this.props.totalAmount}.00
          </Text>
        </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.totalDebtContainer}>
        <View style={styles.totalDebtTotalView}>
          {this.display()}
          <Text style={styles.totalDebtTotalText}> TOTAL</Text>
        </View>
        {this.displayView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  totalOrderIcon: {
    color: color.listBorderColor,
    fontSize: 22
  },
  totalDebtContainer: {
    flexDirection: 'row',
    flex: 0,
    borderTopWidth: 0.5,
    borderTopColor: color.listBorderColor
  },
  totalDebtTotalView: {
    flexDirection: 'row',
    width: '30%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: '#fff',
  },
  totalDebtTotalText: {
    fontSize: 14,
    fontWeight: '400'
    // color: '#000',
  },
  totalDebtRedNumber1: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  totalDebtRedNumberView1: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00'
  },
  totalDebtRedNumberView2: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(218,11,11,59)'
  },
  totalOrderRedNumberView: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.listBorderColor
  },
  totalOrderRedNumber: {
    color: color.primary,
    fontSize: 18,
    fontWeight: 'bold'
  }
})
