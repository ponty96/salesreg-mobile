import gql from 'graphql-tag'

export const ListCompanyExpensesGQL = gql`
  query companyExpenses($companyId: Uuid!, $after: String, $first: Int) {
    companyExpenses(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
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
