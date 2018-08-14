import gql from 'graphql-tag';

export const UpdateCompanyGQL = gql`
  mutation updateCompany(
    $companyId: Uuid!
    $about: String
    $category: Category!
    $contactEmail: String!
    $currency: String!
    $title: String!
    $street1: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    updateCompany(
      id: $companyId
      company: {
        about: $about
        title: $title
        category: $category
        contactEmail: $contactEmail
        currency: $currency
        headOffice: {
          street1: $street1
          city: $city
          state: $state
          country: $country
        }
      }
    ) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Company {
          id
          title
          contactEmail
          about
          category
          currency
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
`;
