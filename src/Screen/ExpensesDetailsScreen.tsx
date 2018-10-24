import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'

interface IProps {
  navigation: any
}
export default class ExpensesDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const expense = navigation.getParam('expense', {})
    return {
      header: (
        <Header
          title="Expense Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertExpense', { expense })
          }
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
      },
      {
        itemTitle: 'Payment Method',
        itemValue: expense.paymentMethod.toUpperCase()
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
        totalAmount={`\u20A6  ${expense.totalAmount}`}
        items={this.parseItems()}
      />
    )
  }
}
