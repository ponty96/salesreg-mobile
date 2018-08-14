import gql from 'graphql-tag';

export const UpdateUserGQL = gql`
  mutation updateUser(
    $dateOfBirth: String!
    $firstName: String!
    $gender: Gender!
    $lastName: String!
    $phoneType: String
    $phoneNumber: String!
    $profilePicture: String
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    updateUser(
      user: {
        dateOfBirth: $dateOfBirth
        firstName: $firstName
        gender: $gender
        lastName: $lastName
        phone: { type: $phoneType, number: $phoneNumber }
        profilePicture: $profilePicture
        location: {
          street1: $street1
          city: $city
          state: $state
          country: $country
        }
      }
    ) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on User {
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
`;
