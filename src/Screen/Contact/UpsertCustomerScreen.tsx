import React, { PureComponent } from 'react'
import UpsertContactForm from '../../Components/Contact/UpsertContactForm'
import Header from '../../Components/Header/BaseHeader'
interface IProps {
  navigation: any
}

export default class UpsertCustomerScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const customer = navigation.getParam('customer', null)
    return {
      header: (
        <Header
          title={
            customer ? `Edit Customer ${customer.contactName}` : 'New Customer'
          }
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
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
