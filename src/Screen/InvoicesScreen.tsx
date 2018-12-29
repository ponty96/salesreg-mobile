import React from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanyInvoicesGQL } from '../graphql/queries/order'
import { color } from '../Style/Color'
import moment from 'moment'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class InvoiceScreen extends React.PureComponent<IProps, IState> {
  state = {
    queryText: ''
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {
    let amountOwed = item.amount - item.amountPaid

    return [
      {
        firstTopText: item.refId,
        bottomLeftFirstText: `${item.user.lastName || ''} ${item.user
          .firstName || ''}`,
        bottomLeftSecondText: '',
        rightTextStyle: { color: amountOwed > 0 ? color.red : color.green },
        topRightText: `\u20A6 ${amountOwed}`,
        bottomRightText: moment(item.dueDate).calendar()
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Invoices"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          showSearchBar
          searchBar={{
            placeholder: 'Search for an invoice',
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          queryText={this.state.queryText}
          graphqlQuery={ListCompanyInvoicesGQL}
          hideSeparator={true}
          graphqlQueryResultKey="listCompanyInvoices"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('InvoiceDetails', {
              sales: { ...item.sale, invoice: { ...item } }
            })
          }
          emptyListText={`No invoice created yet for your company, please make a sale to see an invoice reflect here.`}
          headerText="Empty Invoice List!"
          showFab={false}
        />
      </React.Fragment>
    )
  }
}
