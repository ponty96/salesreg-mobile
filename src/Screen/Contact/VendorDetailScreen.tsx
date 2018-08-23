import React, { PureComponent } from 'react';
import ContactDetails from '../../Components/Contact/ContactDetails';
import CustomHeader from '../../Components/CustomHeader';
interface IProps {
  navigation: any;
}

export default class UpsertVendorScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const vendor = navigation.getParam('vendor', {});
    return {
      header: (
        <CustomHeader
          title="Vendor"
          onBackPress={() => navigation.goBack()}
          showRight
          rightText="Edit"
          firstRightIcon="pencil"
          onPressRightButton={() =>
            navigation.navigate('UpsertVendor', { vendor })
          }
          firstRightIconType="MaterialCommunityIcons"
        />
      )
    };
  };
  render() {
    return (
      <ContactDetails
        contact={this.props.navigation.getParam('vendor', {})}
        contactType="vendor"
      />
    );
  }
}
