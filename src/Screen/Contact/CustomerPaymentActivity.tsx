import React from 'react'
import ActivitiesList from '../../Components/Contact/ActivitiesList'
import Header from '../../Components/Header/DetailsScreenHeader'

interface IProps {
  navigation: any
}

export default class ContactPaymentActivity extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const contact = navigation.getParam('contact')
    return {
      header: (
        <Header
          title={`${contact.contactName.split(' ')[0]}'s Activities`}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }
  render() {
    const contact = this.props.navigation.getParam('contact')
    return (
      <ActivitiesList
        screenText={`${
          contact.contactName.split(' ')[0]
        }'s activities will show up here`}
      />
    )
  }
}
