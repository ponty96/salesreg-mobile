import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'
import Preferences from '../services/preferences'

interface IProps {
  navigation: any
}
export default class PurchaseDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const purchase = navigation.getParam('purchase', {})
    return {
      header: (
        <Header
          title="Purchase Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertPurchase', { purchase })
          }
        />
      )
    }
  }

  onStatusPress = async () => {
    const purchase = this.props.navigation.getParam('purchase', {})
    const hideHint = await Preferences.getOrderStatusHintPref()
    this.props.navigation.navigate('OrderStatusChange', {
      showHint: hideHint ? false : true,
      contact: purchase.contact,
      type: 'purchase',
      status: purchase.status
    })
  }

  parseItems = () => {
    const purchase = this.props.navigation.getParam('purchase', {})
    const { items = [] } = purchase
    return [
      {
        itemTitle: 'Date',
        itemValue: moment(purchase.date).calendar()
      },
      {
        itemTitle: 'Status',
        itemValue: purchase.status
      }
    ].concat(
      items
        .map(item => ({
          itemTitle: item.product.name,
          itemValue: `\u20A6 ${item.unitPrice}`,
          itemQuantity: item.quantity
        }))
        .concat([
          {
            itemTitle: 'Payment Method',
            itemValue: purchase.paymentMethod.toUpperCase()
          }
        ])
    )
  }

  render() {
    const purchase = this.props.navigation.getParam('purchase', {})
    return (
      <GenericDetailsComponent
        title={purchase.contact.contactName}
        totalAmount={parseFloat(purchase.amount).toFixed(2)}
        items={this.parseItems()}
        shouldShowStatus={true}
        onPressStatus={this.onStatusPress}
      />
    )
  }
}
