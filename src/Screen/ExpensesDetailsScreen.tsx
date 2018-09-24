import React, { Component } from 'react'
import { Alert } from 'react-native'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'

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
        itemValue: expense.date
      }
    ].concat(
      expenseItems.map(expenseItem => ({
        itemTitle: expenseItem.itemName,
        itemValue: expenseItem.amount
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
