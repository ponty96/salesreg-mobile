import gql from 'graphql-tag';

export const AuthenticateQueryGQL = gql`
  query Authenticate {
    authenticate @client
  }
`;
