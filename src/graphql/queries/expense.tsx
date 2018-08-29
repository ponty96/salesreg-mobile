import gql from 'graphql-tag'

export const ListCompanyExpensesGQL = gql`
  query companyExpenses($companyId: Uuid!) {
    companyExpenses(companyId: $companyId) {
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
      paidTo
      paymentMethod
      title
      totalAmount
      expenseItems {
        itemName
        amount
        expense {
          id
        }
      }
    }
  }
`
