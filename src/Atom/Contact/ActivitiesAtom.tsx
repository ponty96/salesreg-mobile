import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Left, Right } from 'native-base'

import { color } from '../../Style/Color'
import { MediumText } from '../../Atom/TextAtom'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface IProps {
  amount: number
  dueDate: string
  status: string
  bar: number
  details: string
  title: string
}

export default class ActivitiesAtom extends React.Component<IProps, any> {
  sideTriangle = (val: string, bar: number) => {
    return (
      <View style={bar === 1 ? styles.line1 : styles.line}>
        <View
          style={[
            styles.triangle,
            {
              borderLeftWidth: val === 'paid' ? 12 : 6,
              borderRightWidth: val === 'paid' ? 12 : 6,
              borderBottomWidth: val === 'paid' ? 24 : 12,
              borderBottomColor:
                val === 'paid'
                  ? color.selling
                  : val === 'debt'
                  ? 'red'
                  : 'black'
            }
          ]}
        />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sideList}>
          {this.sideTriangle(this.props.status, this.props.bar)}
        </View>
        <Left
          style={{
            flexDirection: 'column',
            paddingLeft: 12,
            paddingVertical: 16,
            margin: 0
          }}
        >
          <MediumText style={styles.normalFont}>{this.props.title}</MediumText>
          <MediumText
            style={[
              styles.status,
              {
                color:
                  this.props.status === 'paid' ? color.selling : color.textColor
              }
            ]}
          >
            {this.props.details}
          </MediumText>
        </Left>
        <Right
          style={{
            flexDirection: 'column',
            paddingRight: 16,
            paddingVertical: 16
          }}
        >
          <MediumText
            style={[
              styles.cash,
              {
                color:
                  this.props.status === 'paid'
                    ? color.selling
                    : this.props.status === 'debt'
                    ? 'red'
                    : 'black'
              }
            ]}
          >
            {'\u20A6'} {numberWithCommas(this.props.amount)}
          </MediumText>
          <MediumText style={styles.smallFont}>{this.props.dueDate}</MediumText>
        </Right>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.secondary,
    margin: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },
  sideList: {
    paddingLeft: 16,
    // paddingRight: 16,
    alignSelf: 'flex-end',
    margin: 0
  },
  line: {
    justifyContent: 'center',
    borderLeftColor: color.dropdown,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftWidth: 1,
    height: 75,
    width: 35
  },
  line1: {
    borderLeftColor: color.dropdown,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftWidth: 1,
    height: 49,
    width: 35
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '90deg' }]
  },
  cash: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium',
    marginBottom: 10
  },
  status: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium'
  },
  normalFont: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium',
    marginBottom: 10
  },
  smallFont: {
    fontSize: 12,
    fontFamily: 'AvenirNext-Medium'
  }
})
