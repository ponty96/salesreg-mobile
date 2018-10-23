import gql from 'graphql-tag'

export const UpdateUserGQL = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
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
          company {
            id
            title
            contactEmail
            about
            category
            currency
            logo
            phone {
              number
            }
            bank {
              accountName
              accountNumber
              bankName
            }
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
`
