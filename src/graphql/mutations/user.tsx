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
            saleCharge
            id
            title
            shareLink
            contactEmail
            coverPhoto
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
            facebook
            twitter
            instagram
            linkedin
            about
            currency
            slug
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

export const UpsertMobileDevice = gql`
  mutation upsertMobileDevice($mobileDevice: MobileDeviceInput!) {
    upsertMobileDevice(mobileDevice: $mobileDevice) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`

export const DisableMobileDeviceNotification = gql`
  mutation disableMobileDeviceNotification(
    $deviceToken: String!
    $userId: Uuid!
  ) {
    disableMobileDeviceNotification(
      deviceToken: $deviceToken
      userId: $userId
    ) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
