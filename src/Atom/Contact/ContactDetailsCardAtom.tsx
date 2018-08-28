import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback
} from 'react-native'
import { Thumbnail, Icon } from 'native-base'
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
  makeCall = () => {
    const { contact } = this.props
    const phoneNumber = contact.phone ? contact.phone.number : ''
    const url = `tel:${phoneNumber}`
    Linking.canOpenURL(url).then(supported => {
      console.log('make call supported', supported)
      if (supported) {
        Linking.openURL(url).catch(() => null)
      }
    })
  }
  sendEmail = () => {
    const { contact } = this.props
    const url = `mailto://${contact.email}&subject=Hello${contact.contactName}`
    Linking.canOpenURL(url).then(supported => {
      console.log('send email supported', supported)
      if (supported) {
        Linking.openURL(url).catch(() => null)
      }
    })
  }
  render() {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.pictureView}>
            <Thumbnail
              source={{
                uri: this.props.avatar
              }}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.cusName}>{this.props.contactName}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.greyFont}>Total purchase made</Text>
            <Text style={styles.blackFont}>
              {'\u20A6'} {numberWithCommas(this.props.purchaseMade)}
              .00{' '}
            </Text>
            <Text style={styles.greyFont}>{this.props.redText}</Text>
            <Text style={styles.redFont}>
              {'\u20A6'} {numberWithCommas(this.props.overDue)}
              .00
            </Text>
          </View>
        </View>
        <View style={styles.callAndEmail}>
          <TouchableWithoutFeedback onPress={this.makeCall}>
            <View style={styles.innerCallAndEmail}>
              <Icon name="md-call" style={styles.icon} />
              <Text style={styles.cusName}>Make call</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.sendEmail}>
            <View style={styles.innerCallAndEmail}>
              <Icon name="md-mail" style={styles.icon} />
              <Text style={styles.cusName}>Send email</Text>
            </View>
          </TouchableWithoutFeedback>
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
    fontFamily: 'Source Sans Pro'
  },
  blackFont: {
    fontSize: 20,
    fontFamily: 'SourceSansPro-Bold',
    paddingVertical: 5
  },
  redFont: {
    color: 'red',
    fontFamily: 'Source Sans Pro',
    fontSize: 14
  },
  cusName: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Semibold'
  }
})
