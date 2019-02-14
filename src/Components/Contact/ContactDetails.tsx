import React, { PureComponent } from 'react'
import { color } from '../../Style/Color'
import GenericProfileDetails from '../Generic/ProfileDetails'
import moment from 'moment'

import { StyleSheet, TouchableOpacity, View, Linking } from 'react-native'
import Icon from '../../Atom/Icon'
import { numberWithCommas } from '../../Functions/numberWithCommas'
import { DeleteContact } from '../../graphql/mutations/contact'
import { CompanyContactGQL } from '../../graphql/queries/contact'
import { UserContext } from '../../context/UserContext'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import { NotificationBanner } from '../../Components/NotificationBanner'
import { NavigationActions } from 'react-navigation'

interface IProps {
  contact: any
  user?: any
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
      {
        section: 'Birthday',
        value: moment(contact.birthday).format('YYYY-MM-DD') || ''
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
      }
    ]
  }

  resetNavigationStack = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home'
        }),
        NavigationActions.navigate({
          routeName:
            this.props.contactType == 'customer' ? 'Customers' : 'Vendors'
        })
      ]
    })

    this.props.navigation.dispatch(resetAction)
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
        {/* <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CustomerPaymentActivity', {
              contact: contact
            })
          }
        >
          <Text style={styles.rightNavText}>Payment activities</Text>
        </TouchableOpacity> */}
      </View>,
      <GenericProfileDetails
        sections={this.getContactDetails()}
        image={this.props.contact.image}
        headerText={this.props.contact.contactName}
        enableDelete={true}
        graphqlDeleteMutation={DeleteContact}
        graphqlDeleteMutationResultKey="deleteContact"
        graphqlDeleteVariables={{ contactId: contact.id }}
        graphqlRefetchQueries={[
          {
            query: CompanyContactGQL,
            variables: {
              queryText: '',
              companyId: this.props.user.company.id,
              type: this.props.contactType,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() => {
          let banner = NotificationBanner({
            ...configureNotificationBanner('DeleteContact', contact)
          })
          banner.show({ bannerPosition: 'bottom' })

          this.resetNavigationStack()
        }}
        headerSubText={`\u20A6 ${numberWithCommas(
          this.props.contact.totalAmountPaid
        )}`}
      />
    ]
  }
}

const _ContactDetails: any = props => (
  <UserContext.Consumer>
    {({ user }) => <ContactDetails {...props} user={user} />}
  </UserContext.Consumer>
)

export default _ContactDetails

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
