import React, { PureComponent } from 'react'

import UpsertContactForm from '../../Components/Contact/UpsertContactForm'

interface IProps {
  navigation: any
}

export default class UpsertContactScreen extends PureComponent<IProps> {
  static navigationOptions = {
    header: null
  }
  render() {
    let contactType = this.props.navigation.getParam('contactType', null),
      contact = this.props.navigation.getParam('contact', {})

    return (
      <UpsertContactForm
        successRoute="Contacts"
        contact={contact}
        contactType={contactType}
        navigation={this.props.navigation}
      />
    )
  }
}
