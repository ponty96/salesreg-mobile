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
