import gql from 'graphql-tag'

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
            company {
              id
              title
              contactEmail
              about
              currency
              slug
              logo
              facebook
              twitter
              legalDocuments {
                pdfUrl
                name
                type
                id
              }
              instagram
              linkedin
              coverPhoto
              phone {
                number
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
  }
`

export const ForgotPasswordMutationGQL = gql`
  mutation forgotPassword($email: String!){
    forgotPassword(email: $email){
      success 
      fieldErrors {
        key 
        message 
      }
    }
  }
`

export const RegisterUserMutationGQL = gql`
  mutation registerUser($user: UserInput!) {
    registerUser(user: $user) {
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
            company {
              id
              title
              slug
              contactEmail
              about
              legalDocuments {
                pdfUrl
                name
                type
                id
              }
              currency
              coverPhoto
              facebook
              twitter
              instagram
              linkedin
              logo
              phone {
                number
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
  }
`
export const AddUserCompanyMutationGQL = gql`
  mutation addUserCompany($company: CompanyInput!, $userId: Uuid!) {
    addUserCompany(company: $company, user: $userId) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Company {
          id
          title
          slug
          contactEmail
          about
          currency
          facebook
          legalDocuments {
            pdfUrl
            name
            type
            id
          }
          twitter
          instagram
          linkedin
          coverPhoto
          logo
          phone {
            number
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
`
