import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanySalesGQL } from '../graphql/queries/order'
import moment from 'moment'

interface IProps {
  navigation: any
}

export default class SalesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Sales Order"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: item.contact.contactName,
        bottomLeftFirstText: `S ${item.refId}`, //item.paidTo
        bottomLeftSecondText: moment(item.date).calendar(), //item.date
        topRightText: `\u20A6 ${parseFloat(item.amount).toFixed(2)}`,
        bottomRightText: item.status
      }
    ]
  }

  render() {
    return (
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
          onPress: () => this.props.navigation.navigate('SalesOrderDailySales')
        }}
      />
    )
  }
}
