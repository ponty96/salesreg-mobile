import gql from 'graphql-tag';

export const CompanyCustomersGQL = gql`
  query companyCustomers($companyId: Uuid!) {
    companyCustomers(companyId: $companyId) {
      id
      customerName
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
`;
