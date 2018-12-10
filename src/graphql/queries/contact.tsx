import gql from 'graphql-tag'

export const CompanyContactGQL = gql`
  query companyContacts(
    $companyId: Uuid!
    $type: String!
    $after: String
    $first: Int
  ) {
    companyContacts(
      companyId: $companyId
      type: $type
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
          contactName
          email
          image
          type
          gender
          address {
            state
            street1
            city
            id
            country
          }
          phone {
            id
            type
            number
          }
          dislikes
          likes
          maritalStatus
          currency
          birthday

          instagram
          facebook
          twitter
          snapchat

          data: updatedAt
        }
      }
    }
  }
`

export const CompanyCustomersGQL = gql`
  query companyCustomers($queryText: String!, $companyId: Uuid!) {
    companyCustomers(name: $queryText, companyId: $companyId) {
      contactName
      email
      type
      id
    }
  }
`
