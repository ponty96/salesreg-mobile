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
          accountName
          bankCode
          subaccountId
          subaccountTransacId
          bankName
          company {
            bank {
              accountNumber
              bankCode
              subaccountId
              subaccountTransacId
            }
          }
        }
      }
    }
  }
`

export const ListCompanyDeliveryFees = gql`
  query listCompanyDeliveryFees($companyId: Uuid!) {
    listCompanyDeliveryFees(companyId: $companyId) {
      id
      state
      region
      fee
    }
  }
`
