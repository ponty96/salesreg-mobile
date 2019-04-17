import React, { Component } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Icon, ActionSheet } from 'native-base'
import moment from 'moment'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import Header from '../../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../../Components/Generic/Details'
import Preferences from '../../services/preferences'
import { UserContext } from '../../context/UserContext'
import { color } from '../../Style/Color'
import QueryLoader from '../../Components/QueryLoader'
import {
  GetSaleByIdGQL,
  ListCompanySalesGQL
} from '../../graphql/queries/order'
import { convertToLocalTime } from '../../Functions'
import { RegularText } from '../../Atom/TextAtom'
import { DeleteSaleOrderGQL } from '../../graphql/mutations/order'
import AppSpinner from '../../Components/Spinner'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
var BUTTONS = ['Yes, delete', 'Cancel']
var DESTRUCTIVE_INDEX = 0
var CANCEL_INDEX = 1

interface IProps {
  navigation: any
  user?: any
  sales?: any
}

class SalesOrderDetailsScreen extends Component<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  resetNavigationStack = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home'
        }),
        NavigationActions.navigate({
          routeName: 'Sales'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onDeleteCompleted = async res => {
    const {
      deleteSaleOrder: { success, fieldErrors }
    } = res

    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            'Error',
            fieldErrors[0].message,
            [{ text: 'Ok', onPress: () => null }],
            { cancelable: false }
          ),
        100
      )
    } else {
      let banner = NotificationBanner(
        configureNotificationBanner('DeleteSaleOrder')
      )
      banner.show({ bannerPosition: 'bottom' })
      this.resetNavigationStack()
    }
  }

  handleDelete = cb => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Delete?'
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          cb()
        }
      }
    )
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

  renderBottom = (deleteFn?: (variables: any) => void) => {
    const sales =
      this.props.navigation.getParam('sales', null) || this.props.sales

    return (
      <View style={styles.bottomContainer}>
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
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
          onPress={() =>
            this.handleDelete(() =>
              deleteFn({ variables: { saleId: sales.id } })
            )
          }
        >
          <Icon
            type="EvilIcons"
            name="trash"
            style={{ color: color.trashIcon, fontSize: 60 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const sales =
      this.props.navigation.getParam('sales', null) || this.props.sales

    return (
      <React.Fragment>
        <Header
          title="Sales Order Details"
          onPressLeftIcon={() => this.props.navigation.goBack()}
          onPressRightIcon={() =>
            this.props.navigation.navigate('UpsertSales', { sales })
          }
        />
        <Mutation
          mutation={DeleteSaleOrderGQL}
          onCompleted={this.onDeleteCompleted}
          refetchQueries={[
            {
              query: ListCompanySalesGQL,
              variables: {
                companyId: this.props.user.company.id,
                first: 10,
                after: null
              }
            }
          ]}
          awaitRefetchQueries={true}
        >
          {(deleteSaleOrder, { loading }) => (
            <React.Fragment>
              <AppSpinner visible={loading} />
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
                {this.renderBottom(deleteSaleOrder)}
              </View>
            </React.Fragment>
          )}
        </Mutation>
      </React.Fragment>
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
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16
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
