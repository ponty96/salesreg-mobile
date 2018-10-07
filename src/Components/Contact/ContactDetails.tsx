import React, { PureComponent } from 'react'
import { color } from '../../Style/Color'
import ProfileListAtom from '../../Atom/ProfileListAtom'

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
  Image,
  Text
} from 'react-native'
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
          ? {
              street: contact.address.street1,
              city: contact.address.city,
              state: contact.address.state,
              country: contact.address.country
            }
          : {}
      },
      { section: 'Currency', value: contact.currency },
      { section: 'Martial Status', value: contact.maritalStatus },
      { section: 'Birthday', value: contact.birthday },
      {
        section: 'Likes',
        value: contact.likes ? Object.assign({}, contact.likes) : {}
      },
      {
        section: 'Dis Likes',
        value: contact.dislikes ? Object.assign({}, contact.dislikes) : {}
      },
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
      },
      {
        section: 'Snapchat',
        value: contact.snapchat || '',
        icon: 'snapchat'
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
      <FlatList
        data={[
          { section: 'a', value: '' },
          { section: 'b', value: '' },
          ...this.getContactDetails()
        ]}
        renderItem={this.renderItem}
        keyExtractor={item => item.section}
        stickyHeaderIndices={[1]}
      />
    ]
  }

  renderItem = ({ item, index }: any) => {
    const contact = this.props.contact
    if (index == 0) {
      return (
        <View style={styles.pictureView}>
          <Image
            source={{
              uri: contact.image
            }}
            style={{ width: '100%', height: 280 }}
          />
        </View>
      )
    } else if (index == 1) {
      return (
        <View style={styles.textView}>
          <Text style={styles.cusName}>
            {contact.contactName ? contact.contactName.split(' ')[0] : ''}
          </Text>
          <Text style={styles.totalAmount}>
            {'\u20A6'} {numberWithCommas(40000)}
          </Text>
        </View>
      )
    } else {
      return (
        <ProfileListAtom
          section={item.section}
          value={item.value}
          iconName={item.icon}
        />
      )
    }
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
  },
  pictureView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    backgroundColor: color.selling,
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

export default ContactDetails
