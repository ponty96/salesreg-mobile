import gql from 'graphql-tag'

export const UpdateCompanyGQL = gql`
  mutation updateCompany($companyId: Uuid!, $company: CompanyInput!) {
    updateCompany(id: $companyId, company: $company) {
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
