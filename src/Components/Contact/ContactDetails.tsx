import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ContactDetailsCardAtom from '../../Atom/Contact/ContactDetailsCardAtom';
import { TabNavigator } from 'react-navigation';
import ContactTabActivities from './ContactTabActivities';
import ContactTabDetails from './ContactTabDetails';
import { color } from '../../Style/Color';

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
    tabBarOptions: {
      activeTintColor: color.check,
      inactiveTintColor: color.secondary,
      showLabel: true,
      style: {
        backgroundColor: color.primary,
        height: 48,
        padding: 0,
        margin: 0
      },
      labelStyle: { fontSize: 16, fontFamily: 'SourceSansPro-Semibold' },
      indicatorStyle: {
        backgroundColor: color.check,
        marginTop: 20
      },
      upperCaseLabel: true
    },
    animationEnabled: false,
    swipeEnabled: true
  }
);

interface IProps {
  contact: any;
  contactType: string;
}

class ContactDetails extends PureComponent<IProps> {
  render() {
    const contact = this.props.contact;
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
    );
  }
}

export default ContactDetails;
