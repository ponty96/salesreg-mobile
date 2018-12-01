import gql from 'graphql-tag'

export const ListCompanyBanksGQL = gql`
  query companyBanks($companyId: Uuid!, $after: String, $first: Int) {
    companyBanks(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          date: updatedAt
          accountNumber
          bankName
          isPrimary
        }
      }
    }
  }
`
