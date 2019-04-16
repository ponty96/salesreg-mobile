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
          charge
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
            shareLink
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
          date: insertedAt
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
          date: insertedAt
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
          charge
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
            amount
            refId
            amountPaid
            user {
              lastName
              firstName
            }
            dueDate
            shareLink
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
          date: insertedAt
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
          shareLink
          amountPaid
          user {
            lastName
            firstName
          }
          dueDate
          sale {
            amount
            id
            charge
            discount
            amountPaid
            date: insertedAt
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

export const DeleteSaleOrderGQL = gql`
  mutation deleteSaleOrder($saleId: Uuid!) {
    deleteSaleOrder(saleId: $saleId) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
