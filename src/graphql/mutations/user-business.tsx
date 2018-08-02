import gql from 'graphql-tag'

export const EditUserProfileMutationGQL = gql`
  mutation EditUserProfile(
    $userId: Uuid!
    $profilePicture: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: Int!
    $email: String!
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    editUserProfile(
      user: {
        profilePicture: $profilePicture
        email: $email
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        userId: $userId
        headOffice: {
          street1: $street1
          city: $city
          state: $state
          country: $country
        }
      }
    ) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on User {
          user {
            id
            firstName
            lastName
            email
            phoneNumber
            profilePicture
            company {
              id
              branches {
                id
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
`

export const EditBusinessProfileMutationGQL = gql`
  mutation EditBusinessProfile(
    $profilePicture: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: Int!
    $email: String!
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    editBusinessProfile(
      company: {
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
    ) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Company {
          company {
            id
            title
            contactEmail
            about
            category
            currency
            branches {
            id
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
`
