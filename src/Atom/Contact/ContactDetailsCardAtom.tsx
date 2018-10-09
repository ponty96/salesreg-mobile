import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { color } from '../../Style/Color'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface IProps {
  contactName: string
  purchaseMade: number
  overDue: number
  redText: string
  avatar?: string
  contact?: any
}

export default class ContactDetailsCard extends React.Component<IProps, any> {
  render() {
    return (
      <View>
        <View style={styles.pictureView}>
          <Image
            source={{
              uri: this.props.avatar
            }}
            style={{ width: '100%', height: 280 }}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.cusName}>
            {this.props.contactName ? this.props.contactName.split(' ')[0] : ''}
          </Text>
          <Text style={styles.totalAmount}>
            {'\u20A6'} {numberWithCommas(this.props.purchaseMade)}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pictureView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    backgroundColor: color.amountSummaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24
  },
  cusName: {
    fontSize: 16,
    fontFamily: 'AvenirNext-Regular',
    color: '#fff',
    padding: 0
  },
  totalAmount: {
    fontSize: 24,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff',
    marginTop: 6,
    padding: 0
  }
})
