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

export const UpsertBankGQL = gql`
  mutation upsertBank($bankId: Uuid, $bank: BankInput!) {
    upsertBank(bankId: $bankId, bank: $bank) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Bank {
          id
          accountNumber
          bankName
          isPrimary
        }
      }
    }
  }
`
