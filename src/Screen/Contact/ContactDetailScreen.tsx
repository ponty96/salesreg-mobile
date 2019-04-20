import React, { PureComponent } from 'react'

import ContactDetails from '../../Components/Contact/ContactDetails'
import Header from '../../Components/Header/DetailsScreenHeader'

interface IProps {
  navigation: any
}

export default class ContactDetailsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const contact = navigation.getParam('contact', {}),
      contactType = navigation.getParam('type', null)
    return {
      header: (
        <Header
          title={`${
            contactType == 'customer' ? 'Customer' : 'Prospect'
          } details`}
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertContact', { contact, contactType })
          }
        />
      )
    }
  }
  render() {
    return (
      <ContactDetails
        contact={this.props.navigation.getParam('contact', {})}
        contactType={this.props.navigation.getParam('type', null)}
        navigation={this.props.navigation}
      />
    )
  }
}
