import React, { PureComponent } from 'react'

import ContactDetails from '../../Components/Contact/ContactDetails'
import Header from '../../Components/Header/DetailsScreenHeader'

interface IProps {
  navigation: any
}

export default class UpsertCustomerScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const customer = navigation.getParam('customer', {})
    return {
      header: (
        <Header
          title="Customer details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertCustomer', { customer })
          }
        />
      )
    }
  }
  render() {
    return (
      <ContactDetails
        contact={this.props.navigation.getParam('customer', {})}
        contactType="contact"
        navigation={this.props.navigation}
      />
    )
  }
}
