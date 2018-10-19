import React, { PureComponent } from 'react'
import { color } from '../../Style/Color'
import GenericProfileDetails from '../Generic/ProfileDetails'

import { StyleSheet, TouchableOpacity, View, Linking, Text } from 'react-native'
import Icon from '../../Atom/Icon'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface IProps {
  contact: any
  contactType: string
  navigation: any
}

class ContactDetails extends PureComponent<IProps> {
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

  getContactDetails = () => {
    const contact = this.props.contact
    return [
      { section: 'Email', value: contact.email },
      {
        section: 'Phone',
        value: contact && contact.phone ? contact.phone.number : ''
      },
      {
        section: 'Address',
        value: contact.address
          ? [
              contact.address.street1,
              contact.address.city,
              contact.address.state,
              contact.address.country
            ]
          : null
      },
      { section: 'Birthday', value: contact.birthday || '' },
      {
        section: 'Facebook',
        value: contact.facebook || '',
        icon: 'facebook'
      },
      {
        section: 'Instagram',
        value: contact.instagram || '',
        icon: 'instagram'
      },
      {
        section: 'Twitter',
        value: contact.twitter || '',
        icon: 'twitter'
      }
    ]
  }

  render() {
    const contact = this.props.contact
    return [
      <View style={styles.callAndEmail} key="dddd-334">
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.makeCall}>
            <View style={styles.innerCallAndEmail}>
              <Icon name="ios-call" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendEmail}>
            <View style={styles.innerCallAndEmail}>
              <Icon name="ios-mail" style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CustomerPaymentActivity', {
              contact: contact
            })
          }
        >
          <Text style={styles.rightNavText}>Payment activities</Text>
        </TouchableOpacity>
      </View>,
      <GenericProfileDetails
        sections={this.getContactDetails()}
        image={this.props.contact.image}
        headerText={this.props.contact.contactName}
        headerSubText={`\u20A6 ${numberWithCommas(40000)}`}
      />
    ]
  }
}

const styles = StyleSheet.create({
  callAndEmail: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#ffffffc7',
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'space-between',
    paddingRight: 16
  },
  innerCallAndEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24
  },
  icon: {
    color: '#000',
    fontSize: 25,
    padding: 16,
    paddingLeft: 0
  },
  rightNavText: {
    color: color.button,
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium'
  }
})

export default ContactDetails
