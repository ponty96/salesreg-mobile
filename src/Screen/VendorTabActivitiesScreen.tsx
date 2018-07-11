import React from 'react'
import ActivitiesList from '../Components/ActivitiesList'

export default class VendorTabActivitiesScreen extends React.Component {
  render() {
    return (
      <ActivitiesList
        screenText={
          'No activities for John yet. When you add invoices and invoice payments, you will see them here.'
        }
        screenType="vendor"
      />
    )
  }
}
