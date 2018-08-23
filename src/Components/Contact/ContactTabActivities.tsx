import React from 'react';
import ActivitiesList from './ActivitiesList';

interface IProps {
  screenProps: any;
}

export default class ContactTabActivities extends React.Component<IProps> {
  render() {
    const {
      screenProps: { contactType }
    } = this.props;
    return (
      <ActivitiesList
        screenText={
          'No activities for Salomy yet. When you add invoices and invoice payments, you will see them here.'
        }
        screenType={contactType}
      />
    );
  }
}
