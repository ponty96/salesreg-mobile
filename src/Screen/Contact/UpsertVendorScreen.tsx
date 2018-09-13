import React, { PureComponent } from 'react'
import UpsertContactForm from '../../Components/Contact/UpsertContactForm'
import Header from '../../Components/Header/BaseHeader'
interface IProps {
  navigation: any
}

export default class UpsertVendorScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const vendor = navigation.getParam('vendor', null)
    return {
      header: (
        <Header
          title={vendor ? `Edit Vendor ${vendor.contactName}` : 'New Vendor'}
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }
  render() {
    return (
      <UpsertContactForm
        successRoute="Vendors"
        contact={this.props.navigation.getParam('vendor', {})}
        contactType="vendor"
        navigation={this.props.navigation}
      />
    )
  }
}
