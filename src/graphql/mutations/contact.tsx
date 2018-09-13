import gql from 'graphql-tag';

export const UpsertContactGQL = gql`
  mutation upsertContact(
    $contactId: Uuid
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
    $dislikes: [String]
    $likes: [String]
    $contactName: String!
    $currency: String
    $birthday: String
    $maritalStatus: String
    $number: String!
    $userId: Uuid!
    $image: String
    $email: String!
    $bank: BankInput
    $companyId: Uuid!
    $type: String!
  ) {
    upsertContact(
      contact: {
        userId: $userId
        email: $email
        likes: $likes
        dislikes: $dislikes
        birthday: $birthday
        currency: $currency
        contactName: $contactName
        bank: $bank
        maritalStatus: $maritalStatus
        image: $image
        phone: { number: $number }
        type: $type
        address: {
          state: $state
          street1: $street1
          city: $city
          country: $country
        }
        companyId: $companyId
      }
      contactId: $contactId
    ) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Contact {
          id
          contactName
          email
          image
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
          bank {
            bankName
            accountName
            accountNumber
            id
          }
        }
      }
    }
  }
`;
