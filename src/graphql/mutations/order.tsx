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
          id
          refId
          discount
          contact {
            contactName
            id
            gender
            email
          }
          location {
            street1
            state
            country
            city
          }
          paymentMethod
          status
          amount
          amountPaid
          invoice {
            id
            refId
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
          }
        }
      }
    }
  }
`
export const UpsertSaleOrder = gql`
  mutation upsertSaleOrder($sale: SaleInput!) {
    upsertSaleOrder(sale: $sale) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Sale {
          id
          refId
          discount
          contact {
            contactName
            id
            gender
            email
          }
          location {
            street1
            state
            country
            city
          }
          paymentMethod
          status
          amount
          amountPaid
          invoice {
            id
            refId
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

export const CreateRecipt = gql`
  mutation createReceipt($invoiceId: Uuid!, $amountPaid: String!) {
    createReceipt(invoiceId: $invoiceId, amountPaid: $amountPaid) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`

export const UpdateInvoice = gql`
  mutation updateInvoice($invoiceId: Uuid!, $invoice: InvoiceInput!) {
    updateInvoice(invoiceId: $invoiceId, invoice: $invoice) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Invoice {
          id
          amount
          refId
          amountPaid
          user {
            lastName
            firstName
          }
          dueDate
          sale {
            amount
            id
            discount
            amountPaid
            date
            location {
              street1
              state
              country
              city
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
          }
        }
      }
    }
  }
`
