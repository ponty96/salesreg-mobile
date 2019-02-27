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

export const ListCompanyNotificationsGQL = gql`
  query listCompanyNotifications(
    $companyId: Uuid!
    $after: String
    $first: Int
  ) {
    listCompanyNotifications(
      companyId: $companyId
      after: $after
      first: $first
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          actionType
          element
          readStatus
          elementData
          date: insertedAt
          notificationItems {
            changedTo
            current
            itemType
            id
            itemId
          }
        }
      }
    }
  }
`

export const GetUnreadCompanyNotificationsCount = gql`
  query getUnreadCompanyNotificationsCount($companyId: Uuid!) {
    getUnreadCompanyNotificationsCount(companyId: $companyId)
  }
`
