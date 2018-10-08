import gql from 'graphql-tag'

export const UpdateSaleOrderStatusGQL = gql`
  mutation updateOrderStatus(
    $id: Uuid!
    $orderType: String!
    $status: OrderStatus!
  ) {
    updateOrderStatus(id: $id, orderType: $orderType, status: $status) {
      success
      data {
        ... on Sale {
          date
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
        }
      }
    }
  }
`

export const UpdatePurchaseOrderStatusGQL = gql`
  mutation updateOrderStatus(
    $id: Uuid!
    $orderType: String!
    $status: OrderStatus!
  ) {
    updateOrderStatus(id: $id, orderType: $orderType, status: $status) {
      success
      data {
        ... on Purchase {
          date
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
        }
      }
    }
  }
`
