import gql from 'graphql-tag';

export const LoginUserMutationGQL = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      fieldErrors {
        key
        message
      }
      data {
        ... on Authorization {
          message
          accessToken
          refreshToken
          user {
            id
            email
            firstName
            lastName
            dateOfBirth
            gender
            profilePicture
            company {
              id
              title
              contactEmail
              about
              category
              branches {
                id
                type
                location {
                  id
                  city
                  country
                  state
                  street1
                  type
                }
              }
            }
          }
        }
      }
    }
  }
`;
