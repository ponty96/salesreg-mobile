import * as React from 'react'
import { View, StyleSheet, Alert, SectionList, Text } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
import { color } from '../Style/Color'
import { ListCompanyExpensesGQL } from '../graphql/queries/expense'
import { Query } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
import Auth from '../services/auth'
import * as _ from 'lodash'
import moment from 'moment'

interface IProps {
  navigation: any
}

interface IState {
  business: any
}

export default class ExpensesScreen extends React.Component<IProps, IState> {
  state = {
    business: null
  }
  componentDidMount() {
    this.updateState()
  }
  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    console.log('user', user)
    this.setState({
      business: user.company
    })
  }
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

  renderList = ({ item }: any): JSX.Element => {
    const { navigation } = this.props
    return (
      <SalesOrderListAtom
        firstTopText={item.title}
        bottomLeftFirstText={item.paidTo}
        bottomLeftSecondText={item.date}
        topRightText={'\u20A6 ' + item.totalAmount}
        rightTopTextStyle={styles.amount}
        onPress={() =>
          navigation.navigate('ExpensesDetails', { expense: item })
        }
      />
    )
  }

  renderSectionHeader = ({ section }: any): JSX.Element => {
    return (
      <View style={styles.footerWrapper}>
        <Text style={styles.footerText}>{moment(section.date).calendar()}</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props
    const { business } = this.state
    return (
      <Query
        query={ListCompanyExpensesGQL}
        variables={{ companyId: `${business && business.id}` }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data = { companyExpenses: [] } }) => {
          return (
            <View style={styles.container}>
              <AppSpinner visible={loading} />
              <SectionList
                renderItem={this.renderList}
                ListEmptyComponent={
                  <EmptyList
                    type={{
                      Text:
                        'Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLets proceed by tapping the',
                      verifyMainList: 'main',
                      headerText: 'Great habit keeping records!'
                    }}
                  />
                }
                sections={this.parseExpenses(data.companyExpenses)}
                keyExtractor={(item, index) => item.id + index}
                renderSectionHeader={this.renderSectionHeader}
              />
              <FabAtom
                routeName="UpsertExpense"
                navigation={navigation}
                name="database-minus"
                type="MaterialCommunityIcons"
              />
            </View>
          )
        }}
      </Query>
    )
  }

  parseExpenses = expenses => {
    const grouped = _.groupBy(expenses, expense => expense.date) || {}

    const sectionList = Object.keys(grouped).map(key => ({
      date: key,
      data: grouped[key]
    }))
    const sortedSection = sectionList.sort((sectionA, sectionB) => {
      const a = new Date(sectionA.date)
      const b = new Date(sectionB.date)
      return a > b ? -1 : a < b ? 1 : 0
    })
    return sortedSection
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  footerText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    textAlign: 'center'
  },
  footerWrapper: {
    backgroundColor: color.grey,
    marginHorizontal: 10,
    paddingVertical: 8
  },
  amount: {
    color: color.selling,
    marginTop: 0
  },
  headerRight: {
    marginRight: 32,
    width: 30
  }
})
