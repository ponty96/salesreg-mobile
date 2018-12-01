import gql from 'graphql-tag'

export const ListCompanyPurchasesGQL = gql`
  query listCompanyPurchases($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyPurchases(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          date
          contact {
            contactName
            id
            gender
          }
          date
          paymentMethod
          status
          amount
          items {
            id
            unitPrice
            quantity
            product {
              name
              id
              featuredImage
            }
          }
        }
      }
    }
  }
`

export const ListCompanySalesGQL = gql`
  query listCompanySales($companyId: Uuid!, $after: String, $first: Int) {
    listCompanySales(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          contact {
            contactName
            id
            gender
          }
          paymentMethod
          status
          amount
          items {
            id
            unitPrice
            quantity
            product {
              name
              id
              costPrice
              featuredImage
            }
            service {
              name
              id
              featuredImage
            }
          }
          date
        }
      }
    }
  }
`
