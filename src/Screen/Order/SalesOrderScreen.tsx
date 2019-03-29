import * as React from 'react'
import moment from 'moment'

import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListCompanySalesGQL } from '../../graphql/queries/order'
import { convertToLocalTime } from '../../Functions'

interface IProps {
  navigation: any
}

export default class SalesScreen extends React.Component<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {
    let total = parseFloat(
      (Number(item.amount) - Number(item.discount)).toString()
    ).toFixed(2)

    return [
      {
        firstTopText: item.contact.contactName,
        bottomLeftFirstText: `S ${item.refId}`, //item.paidTo
        bottomLeftSecondText: moment(
          convertToLocalTime(item.date, 'YYYY-MM-DD HH:mm:ss')
        ).calendar(), //item.date
        topRightText: `\u20A6 ${total}`,
        bottomRightText: item.status
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Sales Order"
          onPressRightIcon={() =>
            this.props.navigation.navigate('Notifications')
          }
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          graphqlQuery={ListCompanySalesGQL}
          graphqlQueryResultKey="listCompanySales"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('SalesDetails', { sales: item })
          }
          emptyListText={`When you take orders, whether at your offline shop or your online store, they will all be listed here for you to view, track and manage. \n\nTo view your income and profit on your daily sales, tap the [View daily sales link] above.\n\nStart selling by tapping the`}
          headerText="All your orders will appear here"
          fabRouteName="UpsertSales"
          fabIconName="cart-plus"
          fabIconType="FontAwesome"
          subHeader={{
            screen: 'order',
            iconType: 'FontAwesome',
            iconName: 'shopping-cart',
            rightLabel: 'View Daily Sales',
            onPress: () =>
              this.props.navigation.navigate('SalesOrderDailySales')
          }}
        />
      </React.Fragment>
    )
  }
}