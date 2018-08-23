import React, { PureComponent } from 'react';
import ContactDetails from '../../Components/Contact/ContactDetails';
import CustomHeader from '../../Components/CustomHeader';
interface IProps {
  navigation: any;
}

export default class UpsertCustomerScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const customer = navigation.getParam('customer', {});
    return {
      header: (
        <CustomHeader
          title="Customer"
          onBackPress={() => navigation.goBack()}
          showRight
          rightText="Edit"
          firstRightIcon="pencil"
          onPressRightButton={() =>
            navigation.navigate('UpsertCustomer', { customer })
          }
          firstRightIconType="MaterialCommunityIcons"
        />
      )
    };
  };
  render() {
    return (
      <ContactDetails
        contact={this.props.navigation.getParam('customer', {})}
        contactType="customer"
      />
    );
  }
}
