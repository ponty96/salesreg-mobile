import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'
import Preferences from '../services/preferences'

interface IProps {
  navigation: any
}
export default class SalesOrderDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const sales = navigation.getParam('sales', {})
    return {
      header: (
        <Header
          title="Sales Order Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => navigation.navigate('UpsertSales', { sales })}
        />
      )
    }
  }

  onStatusPress = async () => {
    const sales = this.props.navigation.getParam('sales', {})
    const hideHint = await Preferences.getOrderStatusHintPref()
    this.props.navigation.navigate('OrderStatusChange', {
      showHint: hideHint ? false : true,
      contact: sales.contact,
      type: 'sale',
      status: sales.status,
      order: sales
    })
  }

  parseItems = () => {
    const sales = this.props.navigation.getParam('sales', {})
    const { items = [] } = sales
    return [
      {
        itemTitle: 'Date',
        itemValue: moment(sales.date).calendar()
      },
      {
        itemTitle: 'Status',
        itemValue: sales.status
      }
    ].concat(
      items
        .map(item => ({
          itemTitle: item.product ? item.product.name : item.service.name,
          itemValue: `\u20A6 ${item.unitPrice}`,
          itemQuantity: item.quantity
        }))
        .concat([
          {
            itemTitle: 'Payment Method',
            itemValue: sales.paymentMethod.toUpperCase()
          }
        ])
    )
  }

  render() {
    const sales = this.props.navigation.getParam('sales', {})
    return (
      <GenericDetailsComponent
        title={sales.contact.contactName}
        totalAmount={parseFloat(sales.amount).toFixed(2)}
        items={this.parseItems()}
        shouldShowStatus={true}
        showFab={true}
        fabRouteName="Invoice"
        navigation={this.props.navigation}
        fabIconName="receipt"
        fabIconType="MaterialIcons"
        onPressStatus={this.onStatusPress}
      />
    )
  }
}
