import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Thumbnail, Icon } from 'native-base'
import { color } from '../Style/Color'
import { numberWithCommas } from '../Functions/numberWithCommas'

interface IProps {
  customerName: string
  purchaseMade: number
  overDue: number
}

export default class AboveCustomerDetailsAtom extends React.Component<
  IProps,
  any
> {
  makeCall = () => {
    console.log('trying to make call')
  }
  sendEmail = () => {
    console.log('sending an email')
    window.open('mailto:test@example.com')
  }
  render() {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.pictureView}>
            <Thumbnail
              source={{
                uri:
                  'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
              }}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.cusName}>{this.props.customerName}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.greyFont}>Total purchase made</Text>
            <Text style={styles.blackFont}>
              {'\u20A6'} {numberWithCommas(this.props.purchaseMade)}.00{' '}
            </Text>
            <Text style={styles.greyFont}>Overdue</Text>
            <Text style={styles.redFont}>
              {'\u20A6'} {numberWithCommas(this.props.overDue)}.00
            </Text>
          </View>
        </View>
        <View style={styles.callAndEmail}>
          <View style={styles.innerCallAndEmail}>
            <Icon name="md-call" style={styles.icon} />
            <Text style={styles.cusName} onPress={this.makeCall}>
              Make call
            </Text>
          </View>
          <View style={styles.innerCallAndEmail}>
            <Icon name="md-mail" style={styles.icon} />
            <Text style={styles.cusName} onPress={this.sendEmail}>
              Send email
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    height: 106,
    width: '100%',
    backgroundColor: color.secondary
  },
  pictureView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    maxHeight: 106,
    paddingLeft: 32
  },
  textView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '70%',
    maxHeight: 106,
    paddingRight: 32
  },
  icon: {
    color: color.button,
    fontSize: 29,
    padding: 16,
    paddingLeft: 0
  },
  callAndEmail: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 32
  },
  innerCallAndEmail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  greyFont: {
    fontSize: 14,
    color: color.dropdown,
    fontFamily: 'SourceSansPro'
  },
  blackFont: {
    fontSize: 20,
    fontFamily: 'SourceSansPro_Bold',
    paddingVertical: 5
  },
  redFont: {
    color: 'red',
    fontFamily: 'SourceSansPro',
    fontSize: 14
  },
  cusName: {
    fontSize: 16,
    fontFamily: 'SourceSansPro_Semibold'
  }
})
