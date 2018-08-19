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
        value: customer.residentialAdd
          ? `${customer.residentialAdd.street1} ${
              customer.residentialAdd.city
            } ${customer.residentialAdd.state} ${
              customer.residentialAdd.country
            }`
          : ''
      },
      { section: 'Currency', value: customer.currency },
      { section: 'Martial Status', value: customer.maritalStatus },
      { section: 'Birthday', value: customer.birthday },
      { section: 'Likes', value: customer.likes && customer.likes.join(', ') },
      {
        section: 'Dis Likes',
        value: customer.dislikes && customer.dislikes.join(', ')
      },
      {
        section: 'Bank Name',
        value: customer.bank ? customer.bank.bankName : ''
      },
      {
        section: 'Account Name',
        value: customer.bank ? customer.bank.accountName : ''
      },
      {
        section: 'Account Number',
        value: customer.bank ? customer.bank.accountNumber : ''
      }
    ];
  };
  render() {
    return <DetailsList list={this.getCustomerDetails()} />;
  }
}

export default CustomerTabDetailsScreen;
