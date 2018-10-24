import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import { getBankName } from '../utilities/data/picker-lists'

interface IProps {
  navigation: any
}
export default class BankDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const bank = navigation.getParam('bank', {})
    return {
      header: (
        <Header
          title="Bank Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => navigation.navigate('UpsertBank', { bank })}
        />
      )
    }
  }

  parseItems = () => {
    const bank = this.props.navigation.getParam('bank', {})
    const items = [
      {
        itemTitle: 'Account number',
        itemValue: bank.accountNumber
      },
      {
        itemTitle: 'Bank',
        itemValue: getBankName(bank.bankName)
      }
    ]
    if (bank.isPrimary) {
      return items.concat([
        {
          itemTitle: 'Primary Account',
          itemValue: ''
        }
      ])
    } else {
      return items
    }
  }

  render() {
    const bank = this.props.navigation.getParam('bank', {})
    return (
      <GenericDetailsComponent
        title={getBankName(bank.bankName)}
        totalAmount={bank.accountNumber}
        items={this.parseItems()}
        hideTotal={true}
      />
    )
  }
}
