import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanyPurchasesGQL } from '../graphql/queries/order'
import moment from 'moment'

interface IProps {
  navigation: any
}

export default class PurchaseScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Purchase Order"
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
        bottomLeftFirstText: 'PO003', //item.paidTo
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
        graphqlQuery={ListCompanyPurchasesGQL}
        graphqlQueryResultKey="listCompanyPurchases"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate('PurchaseDetails', { purchase: item })
        }
        emptyListText={`As your make your purchases, your product inventory will be instantly updated. All your purchase orders will also appear here for your convenient viewing and management. \n\nStart purchasing by touching the`}
        headerText="Happy Buying!"
        fabRouteName="UpsertPurchase"
        fabIconName="database-minus"
        fabIconType="MaterialCommunityIcons"
      />
    )
  }
}
