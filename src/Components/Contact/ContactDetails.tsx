import React, { PureComponent } from 'react'
import { View } from 'react-native'
import ContactDetailsCardAtom from '../../Atom/Contact/ContactDetailsCardAtom'
import { TabNavigator, TabBarTop } from 'react-navigation'
import ContactTabActivities from './ContactTabActivities'
import ContactTabDetails from './ContactTabDetails'
import { color } from '../../Style/Color'

const TAB = TabNavigator(
  {
    Activities: {
      screen: ContactTabActivities
    },
    Details: {
      screen: ContactTabDetails
    }
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: color.button,
      inactiveTintColor: color.textColor,
      showLabel: true,
      style: {
        backgroundColor: '#fff',
        height: 'auto',
        paddingVertical: 8
      },
      labelStyle: {
        fontSize: 16,
        fontFamily: 'AvenirNext-Demibold',
        color: color.textColor
      },
      indicatorStyle: {
        backgroundColor: color.button,
        marginTop: 20
      },
      upperCaseLabel: true
    },
    animationEnabled: false,
    swipeEnabled: true
  }
)

interface IProps {
  contact: any
  contactType: string
}

class ContactDetails extends PureComponent<IProps> {
  render() {
    const contact = this.props.contact
    return (
      <View style={{ flex: 1 }}>
        <ContactDetailsCardAtom
          contactName={contact.contactName}
          purchaseMade={43000}
          overDue={10000}
          redText="Overdue"
          avatar={contact.image}
          contact={contact}
        />
        <TAB
          screenProps={{
            contact: contact,
            contactType: this.props.contactType
          }}
        />
      </View>
    )
  }
}

export default ContactDetails
