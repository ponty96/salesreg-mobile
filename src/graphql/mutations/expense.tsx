import gql from 'graphql-tag'

export const UpsertExpenseGQL = gql`
  mutation upsertExpense($expense: ExpenseInput, $expenseId: Uuid) {
    upsertExpense(expense: $expense, expenseId: $expenseId) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Expense {
          date
          id
          company {
            id
            title
          }
          paidBy {
            id
            dateOfBirth
            firstName
            lastName
          }
          paymentMethod
          title
          totalAmount
          expenseItems {
            id
            itemName
            amount
          }
        }
      }
    }
  }
`

export const DeleteExpenseGQL = gql`
  mutation deleteExpense($expenseId: Uuid!) {
    deleteExpense(expenseId: $expenseId) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
