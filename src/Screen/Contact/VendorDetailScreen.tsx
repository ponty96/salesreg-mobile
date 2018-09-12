import React, { PureComponent } from 'react'
import ContactDetails from '../../Components/Contact/ContactDetails'
import Header from '../../Components/Header/DetailsScreenHeader'
interface IProps {
  navigation: any
}

export default class UpsertVendorScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const vendor = navigation.getParam('vendor', {})
    return {
      header: (
        <Header
          title="Vendor"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertVendor', { vendor })
          }
        />
      )
    }
  }
  render() {
    return (
      <ContactDetails
        contact={this.props.navigation.getParam('vendor', {})}
        contactType="vendor"
      />
    )
  }
}
