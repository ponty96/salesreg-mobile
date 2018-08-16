import gql from 'graphql-tag';

export const CompanyCustomersGQL = gql`
  query companyCustomers($companyId: Uuid!) {
    companyCustomers(companyId: $companyId) {
      id
      company {
        id
      }
      customerName
      email
      fax
      image
      officeAdd {
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
    }
  }
`;
