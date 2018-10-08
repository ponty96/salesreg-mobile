import gql from 'graphql-tag'

export const ListCompanyPurchasesGQL = gql`
  query listCompanyPurchases($companyId: Uuid!) {
    listCompanyPurchases(companyId: $companyId) {
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
        }
      }
    }
  }
`

export const ListCompanySalesGQL = gql`
  query listCompanySales($companyId: Uuid!) {
    listCompanySales(companyId: $companyId) {
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
          featuredImage
          id
          costPrice
        }
        service {
          name
          id
        }
      }

      date
    }
  }
`
