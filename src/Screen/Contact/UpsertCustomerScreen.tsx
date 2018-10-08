import React, { PureComponent } from 'react'
import UpsertContactForm from '../../Components/Contact/UpsertContactForm'
interface IProps {
  navigation: any
}

export default class UpsertCustomerScreen extends PureComponent<IProps> {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <UpsertContactForm
        successRoute="Customers"
        contact={this.props.navigation.getParam('customer', {})}
        contactType="customer"
        navigation={this.props.navigation}
      />
    )
  }
}
