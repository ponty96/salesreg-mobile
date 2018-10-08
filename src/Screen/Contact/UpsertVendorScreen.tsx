import React, { PureComponent } from 'react'
import UpsertContactForm from '../../Components/Contact/UpsertContactForm'
interface IProps {
  navigation: any
}

export default class UpsertVendorScreen extends PureComponent<IProps> {
  static navigationOptions = {
    header: null
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
