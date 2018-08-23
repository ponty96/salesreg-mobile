import React, { Component } from 'react';
import DetailsList from '../DetailsList';

interface IProps {
  navigation: any;
  screenProps: any;
}

class ContactTabDetails extends Component<IProps> {
  getContactDetails = () => {
    const {
      screenProps: { contact }
    } = this.props;
    return [
      { section: 'Email', value: contact.email },
      {
        section: 'Phone',
        value: contact && contact.phone ? contact.phone.number : ''
      },
      {
        section: 'Address',
        value: contact.address
          ? `${contact.address.street1} ${contact.address.city} ${
              contact.address.state
            } ${contact.address.country}`
          : ''
      },
      { section: 'Currency', value: contact.currency },
      { section: 'Martial Status', value: contact.maritalStatus },
      { section: 'Birthday', value: contact.birthday },
      { section: 'Likes', value: contact.likes && contact.likes.join(', ') },
      {
        section: 'Dis Likes',
        value: contact.dislikes && contact.dislikes.join(', ')
      },
      {
        section: 'Bank Name',
        value: contact.bank ? contact.bank.bankName : ''
      },
      {
        section: 'Account Name',
        value: contact.bank ? contact.bank.accountName : ''
      },
      {
        section: 'Account Number',
        value: contact.bank ? contact.bank.accountNumber : ''
      }
    ];
  };
  render() {
    return <DetailsList list={this.getContactDetails()} />;
  }
}

export default ContactTabDetails;
