import gql from 'graphql-tag'

export const ListCompanyBonanzasGQL = gql`
  query listCompanyBonanzas($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyBonanzas(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          date: startDate
          startDate
          endDate
          coverPhoto
          bonanzaItems {
            id
            product {
              id
              name
            }
            maxQuantity
            priceSlashTo
          }
        }
      }
    }
  }
`
