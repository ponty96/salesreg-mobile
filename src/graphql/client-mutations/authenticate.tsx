import gql from 'graphql-tag'

export const AuthenticateClientGQL = gql`
  mutation authenticate($user: User!) {
    authenticate(user: $user) @client
  }
`
