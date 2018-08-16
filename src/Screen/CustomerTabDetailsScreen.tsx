import React, { Component } from 'react';
import DetailsList from '../Components/DetailsList';

interface IProps {
  navigation: any;
  customer: any;
  screenProps: any;
}
class CustomerTabDetailsScreen extends Component<IProps> {
  getCustomerDetails = () => {
    const {
      screenProps: { customer }
    } = this.props;
    return [
      { section: 'Email', value: customer.email },
      {
        section: 'Phone',
        value: customer && customer.phone ? customer.phone.number : ''
      },
      { section: 'Fax', value: customer.fax || '' },
      {
        section: 'Address',
        value: customer.officeAdd
          ? `${customer.officeAdd.street1} ${customer.officeAdd.city} ${
              customer.officeAdd.state
            } ${customer.officeAdd.country}`
          : ''
      }
    ];
  };
  render() {
    return <DetailsList list={this.getCustomerDetails()} />;
  }
}

export default CustomerTabDetailsScreen;
