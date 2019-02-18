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
          refId
          charge
          discount
          contact {
            contactName
            id
            gender
            email
          }
          paymentMethod
          status
          amount
          location {
            street1
            state
            country
            city
          }
          amountPaid
          invoice {
            id
            refId
            shareLink
            dueDate
          }
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
          }
          date
        }
      }
    }
  }
`

export const ListCompanyInvoicesGQL = gql`
  query listCompanyInvoices($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyInvoices(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          amount
          refId
          shareLink
          amountPaid
          allowsSplitPayment
          user {
            lastName
            firstName
          }
          dueDate
          sale {
            amount
            charge
            id
            discount
            contact {
              contactName
              id
              email
            }
            location {
              street1
              state
              country
              city
            }
            amountPaid
            date
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
            }
          }
        }
      }
    }
  }
`
