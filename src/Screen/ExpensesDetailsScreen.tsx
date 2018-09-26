import React, { Component } from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'

interface IProps {
  navigation: any
}
export default class ExpensesDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Expense Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => Alert.alert('Edit pressed.')}
        />
      )
    }
  }

  parseItems = () => {
    const expense = this.props.navigation.getParam('expense', {})
    const { expenseItems = [] } = expense
    return [
      {
        itemTitle: 'Date',
        itemValue: moment(expense.date).calendar()
      }
    ].concat(
      expenseItems.map(expenseItem => ({
        itemTitle: expenseItem.itemName,
        itemValue: `\u20A6 ${expenseItem.amount}`
      }))
    )
  }

  render() {
    const expense = this.props.navigation.getParam('expense', {})
    return (
      <GenericDetailsComponent
        title={expense.title}
        totalAmount={expense.totalAmount}
        items={this.parseItems()}
      />
    )
  }
}
