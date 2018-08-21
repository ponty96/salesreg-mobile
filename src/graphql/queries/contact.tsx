import gql from 'graphql-tag';

export const CompanyContactGQL = gql`
  query companyContacts($companyId: Uuid!, $type: String!) {
    companyContacts(companyId: $companyId, type: $type) {
      id
      contactName
      email
      image
      type
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
