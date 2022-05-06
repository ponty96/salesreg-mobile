import gql from 'graphql-tag'

export const AuthenticateQueryGQL = gql`
  query Authenticate {
    authenticate @client
    user @client {
      firstName
      lastName
      company {
        contactEmail
        slug
        id
      }
    }
  }
`

export const SingleUserGQL = gql`
  query singleUser($id: Uuid!) {
    singleUser(id: $id) {
      ... on User {
        id
        company {
          id
          deliveryFees {
            id
            state
            region
            fee
          }
        }
      }
    }
  }
`
