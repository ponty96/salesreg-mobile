import * as React from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanySalesGQL } from '../graphql/queries/order'

interface IProps {
  navigation: any
}

export default class SalesOrderDailySalesScreen extends React.Component<
  IProps
> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Daily Sales Record"
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }

  parseData = (salesOrder: any) => {
    const { items } = salesOrder
    return items.map(item => ({
      firstTopText: item.product ? item.product.name : item.service.name,
      bottomLeftFirstText: salesOrder.contact.contactName,
      bottomLeftSecondText: '',
      topRightText: item.quantity,
      bottomRightText: `\u20A6 ${parseFloat(item.unitPrice).toFixed(2)}`,
      /***
       * TODO Add featuredImage to services on the API
       */
      avatar: item.product
        ? item.product.featuredImage
        : item.service.featuredImage
    }))
  }

  render() {
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanySalesGQL}
        sectionHeaderContainerStyle={{ marginTop: 8 }}
        graphqlQueryResultKey="listCompanySales"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate('SalesDetails', { sales: item })
        }
        emptyListText={`You will be able to see the total sales and profit you have made at the end of each day`}
        headerText="Your daily sales shows up here."
        shouldRenderFooter={true}
        fetchPolicy="cache-first"
        showFab={false}
      />
    )
  }
}
