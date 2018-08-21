import gql from 'graphql-tag';

export const UpsertCustomerGQL = gql`
  mutation upsertCustomer(
    $customerId: Uuid
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
    $dislikes: [String]
    $likes: [String]
    $customerName: String!
    $currency: String
    $birthday: String
    $maritalStatus: String
    $number: String!
    $userId: Uuid!
    $image: String
    $email: String!
    $bank: BankInput
    $companyId: Uuid!
  ) {
    upsertCustomer(
      customer: {
        userId: $userId
        email: $email
        likes: $likes
        dislikes: $dislikes
        birthday: $birthday
        currency: $currency
        customerName: $customerName
        bank: $bank
        maritalStatus: $maritalStatus
        image: $image
        phone: { number: $number }
        address: {
          state: $state
          street1: $street1
          city: $city
          country: $country
        }
        companyId: $companyId
      }
      customerId: $customerId
    ) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Customer {
          id
          customerName
          email
          fax
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
