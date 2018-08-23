import React, { PureComponent } from 'react';
import UpsertContactForm from '../../Components/Contact/UpsertContactForm';
import CustomHeader from '../../Components/CustomHeader';
interface IProps {
  navigation: any;
}

export default class UpsertVendorScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const vendor = navigation.getParam('vendor', null);
    return {
      header: (
        <CustomHeader
          title={vendor ? `Edit Vendor ${vendor.contactName}` : 'New Vendor'}
          onBackPress={() => navigation.goBack()}
        />
      )
    };
  };
  render() {
    return (
      <UpsertContactForm
        successRoute="Vendors"
        contact={this.props.navigation.getParam('vendor', {})}
        contactType="vendor"
        navigation={this.props.navigation}
      />
    );
  }
}
