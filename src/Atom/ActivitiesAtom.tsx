import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Left, Right } from 'native-base'
import { color } from '../Style/Color'
import { numberWithCommas } from '../Functions/numberWithCommas'

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
        <View style={styles.mainList}>
          <Left style={{ flexDirection: 'column', paddingLeft: 12, margin: 0 }}>
            <Text style={styles.normalFont}>{this.props.title}</Text>
            <Text
              style={[
                styles.cash,
                {
                  color: this.props.status === 'paid' ? color.selling : 'black'
                }
              ]}
            >
              {this.props.details}
            </Text>
          </Left>
          <Right style={{ flexDirection: 'column', paddingRight: 16 }}>
            <Text
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
            </Text>
            <Text style={styles.smallFont}>{this.props.dueDate}</Text>
          </Right>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: color.secondary,
    margin: 0
  },
  sideList: {
    width: '11%',
    paddingLeft: 16,
    // paddingRight: 16,
    alignSelf: 'flex-end',
    margin: 0
  },
  mainList: {
    width: '89%',
    backgroundColor: color.secondary,
    height: 75,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
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
    height: 47,
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
    fontSize: 16,
    fontFamily: 'SourceSansPro',
    paddingTop: 3,
    paddingBottom: 6
  },
  normalFont: {
    fontSize: 16,
    fontFamily: 'SourceSansPro',
    paddingTop: 8,
    color: color.button
  },
  smallFont: {
    fontSize: 14,
    fontFamily: 'SourceSansPro'
  }
})
