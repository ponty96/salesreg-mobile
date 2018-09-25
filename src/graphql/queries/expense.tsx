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
      paymentMethod
      title
      totalAmount
      expenseItems {
        id
        itemName
        amount
        expense {
          id
        }
      }
    }
  }
`
