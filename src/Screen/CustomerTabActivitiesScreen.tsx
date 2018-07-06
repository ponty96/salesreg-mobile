import React from 'react'
import ActivitiesList from '../Components/ActivitiesList'

export default class CustomerTabActivitiesScreen extends React.Component {
  render() {
    return (
      <ActivitiesList
        screenText={
          'No activities for Salomy yet. When you add invoices and invoice payments, you will see them here.'
        }
        screenType="customer"
      />
    )
  }
}
