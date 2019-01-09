import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'
import { DeleteExpenseGQL } from '../graphql/mutations/expense'
import { ListCompanyExpensesGQL } from '../graphql/queries/expense'
import { UserContext } from '../context/UserContext'
import { NotificationContext } from '../context/NotificationContext'
import configureNotificationBanner from '../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

class ExpensesDetailsScreen extends Component<IProps> {
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
        totalAmount={expense.totalAmount}
        items={this.parseItems()}
        graphqlDeleteMutation={DeleteExpenseGQL}
        graphqlDeleteMutationResultKey="deleteExpense"
        graphqlDeleteVariables={{ expenseId: expense.id }}
        graphqlRefetchQueries={[
          {
            query: ListCompanyExpensesGQL,
            variables: {
              queryText: '',
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() => {
          this.props.setNotificationBanner(
            configureNotificationBanner('DeleteExpense', expense)
          )
          this.props.navigation.navigate('Expenses')
        }}
      />
    )
  }
}

const _ExpensesDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <ExpensesDetailsScreen
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_ExpensesDetailsScreen.navigationOptions =
  ExpensesDetailsScreen.navigationOptions

export default _ExpensesDetailsScreen
