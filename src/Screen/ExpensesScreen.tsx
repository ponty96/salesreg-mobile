import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanyExpensesGQL } from '../graphql/queries/expense'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class ExpensesScreen extends React.Component<IProps, IState> {
  state = {
    queryText: ''
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: item.title,
        bottomLeftFirstText: '', // item.paidTo
        bottomLeftSecondText: '', // item.date
        topRightText: `\u20A6 ${item.totalAmount}`
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Expenses"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          showSearchBar
          searchBar={{
            placeholder: 'Search for an expense',
            queryText: this.state.queryText,
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          queryText={this.state.queryText}
          graphqlQuery={ListCompanyExpensesGQL}
          graphqlQueryResultKey="companyExpenses"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('ExpensesDetails', { expense: item })
          }
          emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLet's proceed by tapping the`}
          headerText="Great habit keeping records!"
          fabRouteName="UpsertExpense"
          fabIconName="database-minus"
          fabIconType="MaterialCommunityIcons"
        />
      </React.Fragment>
    )
  }
}
