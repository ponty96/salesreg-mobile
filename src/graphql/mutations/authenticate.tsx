import gql from 'graphql-tag';

export const LoginUserMutationGQL = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
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
            phone {
              type
              number
            }
            location {
              id
              city
              country
              state
              street1
              type
            }
            company {
              id
              title
              contactEmail
              about
              category
              currency
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

export const RegisterCompanyMutationGQL = gql`
  mutation registerCompany(
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
    $contactEmail: String!
    $currency: String
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
    $category: Category!
    $title: String!
    $email: String!
  ) {
    registerCompany(
      company: {
        category: $category
        contactEmail: $contactEmail
        currency: $currency
        headOffice: {
          street1: $street1
          city: $city
          state: $state
          country: $country
        }
        title: $title
      }
      user: {
        email: $email
        firstName: $firstName
        gender: MALE
        lastName: $lastName
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Company {
          id
          title
        }
      }
    }
  }
`;
