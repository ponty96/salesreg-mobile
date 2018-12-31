import gql from 'graphql-tag'

export const UpsertContactGQL = gql`
  mutation upsertContact($contactId: Uuid, $contact: ContactInput!) {
    upsertContact(contact: $contact, contactId: $contactId) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Contact {
          id
          contactName
          allowsMarketing
          email
          image
          type
          gender
          address {
            state
            street1
            city
            id
            country
          }
          phone {
            id
            type
            number
          }
          dislikes
          likes
          maritalStatus
          currency
          birthday

          instagram
          facebook
          twitter
          snapchat
          totalDebt
          totalAmountPaid

          data: updatedAt
        }
      }
    }
  }
`
export const DeleteContact = gql`
  mutation deleteContact($contactId: Uuid!) {
    deleteContact(contactId: $contactId) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
