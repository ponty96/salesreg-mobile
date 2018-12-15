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
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Invoices"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
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
      <GenericListIndex
        navigation={this.props.navigation}
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
    )
  }
}
