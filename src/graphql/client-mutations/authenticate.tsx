import gql from "graphql-tag";

export const AuthenticateClientGQL = gql`
  mutation authenticate {
    authenticate @client
  }
`;