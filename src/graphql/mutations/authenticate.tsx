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
          s3Bucket
          s3Region
          s3AccessKey
          s3SecretKey
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
              saleCharge
              shareLink
              contactEmail
              about
              currency
              deliveryFees {
                id
                state
                region
                fee
              }
              bank {
                accountNumber
                bankCode
                subaccountId
                subaccountTransacId
              }
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
          s3Bucket
          s3Region
          s3AccessKey
          s3SecretKey
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
              saleCharge
              title
              slug
              shareLink
              contactEmail
              about
              deliveryFees {
                id
                state
                region
                fee
              }
              legalDocuments {
                pdfUrl
                name
                type
                id
              }
              bank {
                accountNumber
                bankCode
                subaccountId
                subaccountTransacId
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
          saleCharge
          id
          title
          slug
          contactEmail
          shareLink
          about
          currency
          deliveryFees {
            id
            state
            region
            fee
          }
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
