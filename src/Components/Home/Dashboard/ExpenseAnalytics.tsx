import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { Query } from 'react-apollo'
import moment from 'moment'

import { MediumText, DemiBoldText, RegularText } from '../../../Atom/TextAtom'
import DashboardStyles from './DashboardStyles'
import { numberWithCommas } from '../../../Functions/numberWithCommas'
import RangePickerAtom from '../../../Atom/RangePickerAtom'
import { ExpenseDashboardInfoGQL } from '../../../graphql/queries/expense'
import RequestActivityIndicator from './RequestActivityIndicator'

interface IState {
  isRangePickerVisible: boolean
  startDate: string
  endDate: string
  shouldLoad: boolean
  groupBy: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
}

interface IProps {
  shouldLoad: boolean
}

export default class ExpenseAnalytics extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    this.state = {
      isRangePickerVisible: false,
      startDate: moment()
        .subtract(5, 'd')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      groupBy: 'DAILY',
      shouldLoad: false
    }
  }

  componentDidUpdate() {
    if (this.props.shouldLoad && !this.state.shouldLoad) {
      this.setState({
        shouldLoad: true
      })
    }
  }

  setFilter = (startDate, endDate, groupBy) => {
    this.setState({
      startDate,
      endDate,
      groupBy
    })
  }

  renderExpenseAmount = data => (
    <View style={styles.row}>
      <DemiBoldText style={styles.largeText}>{`\u20A6${numberWithCommas(
        data.totalExpense || 0
      )}`}</DemiBoldText>
      <View style={styles.row}>
        <Icon
          style={styles.redText}
          name="ios-arrow-round-down"
          type="Ionicons"
        />
        <MediumText style={[styles.redText, { marginLeft: 5 }]}>0%</MediumText>
      </View>
    </View>
  )

  renderExpenses = data => {
    let { topExpenses } = data

    return (
      <View style={styles.expenseContainer}>
        <MediumText style={styles.smallText}>EXPENSE BREAKDOWN</MediumText>
        {topExpenses.length > 0 ? (
          topExpenses.map((expense, i) => (
            <View style={[styles.row, styles.borderedExpense]} key={i}>
              <RegularText style={[styles.smallText, styles.productsText]}>
                {expense.title}
              </RegularText>
              <RegularText style={[styles.smallText, styles.productsText]}>
                {`\u20A6${numberWithCommas(expense.totalInGroup || 0)}`}{' '}
              </RegularText>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <RegularText style={[styles.smallText, styles.noDataText]}>
              No expenses yet
            </RegularText>
          </View>
        )}
      </View>
    )
  }

  render() {
    let { startDate, endDate, groupBy, shouldLoad } = this.state

    return (
      <Query
        query={ExpenseDashboardInfoGQL}
        fetchPolicy="cache-and-network"
        skip={!shouldLoad}
        variables={{ query: { startDate, endDate, groupBy } }}
      >
        {({ loading, data }) => {
          let _data = data && data.expenseDashboardInfo

          return (
            <View style={styles.container}>
              <View style={styles.row}>
                <MediumText style={styles.smallText}>TOTAL EXPENSE</MediumText>
                <Icon
                  name="today"
                  type="MaterialIcons"
                  style={styles.icon}
                  onPress={() => this.setState({ isRangePickerVisible: true })}
                />
              </View>
              {loading && (
                <RequestActivityIndicator
                  delay={500}
                  containerStyle={styles.loadingContainer}
                />
              )}
              {!loading && _data && (
                <React.Fragment>
                  {this.renderExpenseAmount(_data)}
                  {this.renderExpenses(_data)}
                </React.Fragment>
              )}
              <RangePickerAtom
                visible={this.state.isRangePickerVisible}
                onSave={this.setFilter}
                onRequestClose={() =>
                  this.setState({ isRangePickerVisible: false })
                }
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  ...DashboardStyles,
  expenseContainer: {
    paddingBottom: 15,
    marginTop: 25
  },
  borderedExpense: {
    paddingVertical: 15,
    borderBottomColor: '#757575',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
