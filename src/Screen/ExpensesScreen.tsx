import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanyExpensesGQL } from '../graphql/queries/expense'

interface IProps {
  navigation: any
}

export default class ExpensesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Expenses"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: item.title,
        bottomLeftFirstText: '', //item.paidTo
        bottomLeftSecondText: '', //item.date
        topRightText: `\u20A6 ${item.totalAmount}`
      }
    ]
  }

  render() {
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanyExpensesGQL}
        graphqlQueryResultKey="companyExpenses"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate('ExpensesDetails', { expense: item })
        }
        emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLets proceed by tapping the`}
        headerText="Great habit keeping records!"
        fabRouteName="UpsertExpense"
        fabIconName="database-minus"
        fabIconType="MaterialCommunityIcons"
      />
    )
  }
}
