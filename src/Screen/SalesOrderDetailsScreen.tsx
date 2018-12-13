import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'
import Preferences from '../services/preferences'
import { DeleteSalesOrderGQL } from '../graphql/mutations/order'
import { ListCompanySalesGQL } from '../graphql/queries/order'
import { UserContext } from '../context/UserContext'

interface IProps {
  navigation: any
  user?: any
}

class SalesOrderDetailsScreen extends Component<IProps> {
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
        fabRouteParams={{ sales }}
        navigation={this.props.navigation}
        fabIconName="receipt"
        fabIconType="MaterialIcons"
        onPressStatus={this.onStatusPress}
        graphqlDeleteMutation={DeleteSalesOrderGQL}
        graphqlDeleteMutationResultKey="deleteSaleOrder"
        graphqlDeleteVariables={{ saleId: sales.id }}
        graphqlRefetchQueries={[
          {
            query: ListCompanySalesGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() => this.props.navigation.navigate('Sales')}
      />
    )
  }
}

const _SalesOrderDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <SalesOrderDetailsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

export default _SalesOrderDetailsScreen
