import gql from 'graphql-tag'

export const ListCompanyBanksGQL = gql`
  query companyBanks($companyId: Uuid!) {
    companyBanks(companyId: $companyId) {
      id
      date: updatedAt
      accountNumber
      bankName
      isPrimary
    }
  }
`
