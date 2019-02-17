import gql from 'graphql-tag'

export const ListSpecialOffersGQL = gql`
  query listSpecialOffers($companyId: Uuid!, $after: String, $first: Int) {
    listSpecialOffers(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          startDate
          endDate
          coverPhoto
          items {
            id
            name
            maximumQuantity
            priceSlashTo
          }
        }
      }
    }
  }
`
