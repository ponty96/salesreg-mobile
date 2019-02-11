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
          slug
          contactEmail
          about
          coverPhoto
          legalDocuments {
            pdfUrl
            name
            type
            id
          }
          facebook
          twitter
          instagram
          linkedin
          currency
          logo
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
          date: updatedAt
          accountNumber
          accountName
          bankCode
          subaccountId
          bankName
        }
      }
    }
  }
`

export const DeleteBankGQL = gql`
  mutation deleteBank($bankId: Uuid!) {
    deleteBank(bankId: $bankId) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`

export const UpdateCompanyCoverPhotoGQL = gql`
  mutation updateCompanyCoverPhoto($coverPhoto: CoverPhotoInput!) {
    updateCompanyCoverPhoto(coverPhoto: $coverPhoto) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Company {
          coverPhoto
        }
      }
    }
  }
`

export const UpsertLegalDocument = gql`
  mutation upsertLegalDocument(
    $legalDocument: LegalDocumentInput!
    $legalDocumentId: Uuid
  ) {
    upsertLegalDocument(
      legalDocument: $legalDocument
      legalDocumentId: $legalDocumentId
    ) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Company {
          legalDocuments {
            name
            pdfUrl
            type
            id
          }
        }
      }
    }
  }
`

export const DeleteLegalDocument = gql`
  mutation deleteLegalDocument($legalDocumentId: Uuid!) {
    deleteLegalDocument(legalDocumentId: $legalDocumentId) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Company {
          legalDocuments {
            name
            pdfUrl
            type
            id
          }
        }
      }
    }
  }
`
