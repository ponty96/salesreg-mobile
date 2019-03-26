import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import moment from 'moment'

import Header from '../../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../../Components/Generic/Details'
import Preferences from '../../services/preferences'
import { UserContext } from '../../context/UserContext'
import { color } from '../../Style/Color'
import QueryLoader from '../../Components/QueryLoader'
import { GetSaleByIdGQL } from '../../graphql/queries/order'
import { convertToLocalTime } from '../../Functions'
import { RegularText } from '../../Atom/TextAtom'

interface IProps {
  navigation: any
  user?: any
  sales?: any
}

class SalesOrderDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Sales Order Details"
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }

  onStatusPress = async () => {
    const sales =
      this.props.navigation.getParam('sales', null) || this.props.sales
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
    const sales =
      this.props.navigation.getParam('sales', null) || this.props.sales
    const { items = [] } = sales

    return [
      {
        itemTitle: 'Date',
        itemValue: moment(
          convertToLocalTime(sales.date, 'YYYY-MM-DD HH:mm:ss')
        ).calendar()
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
            itemTitle: 'Delivery Address',
            itemValue: sales.location
              ? [
                  sales.location.street1,
                  sales.location.city,
                  sales.location.state,
                  sales.location.country
                ]
              : null
          },
          {
            itemTitle: 'Discount',
            itemValue: `\u20A6 ${sales.discount}`
          },
          {
            itemTitle: 'Delivery Fee',
            itemValue: `\u20A6 ${sales.deliveryFee || 0}`
          }
        ])
    )
  }

  render() {
    const sales =
      this.props.navigation.getParam('sales', null) || this.props.sales

    return (
      <View style={styles.container}>
        <GenericDetailsComponent
          title={sales.contact.contactName}
          totalAmount={parseFloat(
            (Number(sales.amount) - Number(sales.discount)).toString()
          ).toFixed(2)}
          items={this.parseItems()}
          shouldShowStatus={true}
          onPressStatus={this.onStatusPress}
          enableDelete={false}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('InvoiceDetails', {
              sales,
              from: 'Sales'
            })
          }
        >
          <View style={styles.invoicebuttomContainer}>
            <RegularText style={styles.invoiceText}>Invoice</RegularText>
            <Icon
              name="chevron-small-right"
              type="Entypo"
              style={styles.invoiceIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  invoicebuttomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
    paddingRight: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bdbdbd',
    backgroundColor: '#fff'
  },
  invoiceText: {
    fontSize: 16,
    color: color.button
  },
  invoiceIcon: {
    fontSize: 35,
    color: color.button
  }
})

const _SalesOrderDetailsScreen: any = props => {
  let {
    navigation: {
      state: {
        params: { ownedBy, orderId }
      }
    }
  } = props

  return (
    <QueryLoader
      from={ownedBy}
      graphqlQuery={GetSaleByIdGQL}
      graphqlQueryResultKey="getSaleById"
      variables={{ saleId: orderId }}
    >
      {data => (
        <UserContext.Consumer>
          {({ user }) => (
            <SalesOrderDetailsScreen {...props} sales={data} user={user} />
          )}
        </UserContext.Consumer>
      )}
    </QueryLoader>
  )
}

_SalesOrderDetailsScreen.navigationOptions =
  SalesOrderDetailsScreen.navigationOptions

export default _SalesOrderDetailsScreen
