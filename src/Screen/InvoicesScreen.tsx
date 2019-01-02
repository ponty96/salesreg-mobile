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

export default class InvoiceScreen extends React.PureComponent<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {
    let total = parseFloat(
      (Number(item.amount) - Number(item.sale.discount || 0)).toString()
    ).toFixed(2)
    let amountOwed = Number(total) - item.amountPaid

    return [
      {
        firstTopText: item.refId,
        bottomLeftFirstText: `${item.sale.contact.contactName}`,
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
        />
        <GenericListIndex
          navigation={this.props.navigation}
          graphqlQuery={ListCompanyInvoicesGQL}
          hideSeparator={true}
          graphqlQueryResultKey="listCompanyInvoices"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('InvoiceDetails', {
              sales: { ...item.sale, invoice: { ...item } },
              from: 'Invoices'
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
