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
          saleCharge
          id
          title
          shareLink
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
          bank {
            accountNumber
            bankCode
            subaccountId
            subaccountTransacId
          }
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
          subaccountTransacId
          bankName
          company {
            bank {
              accountNumber
              bankCode
              subaccountId
              subaccountTransacId
            }
          }
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

export const CreateDeliveryFee = gql`
  mutation createDeliveryFee(
    $companyId: Uuid!
    $state: String!
    $region: String!
    $fee: String!
    $userId: Uuid!
  ) {
    createDeliveryFee(
      companyId: $companyId
      state: $state
      region: $region
      fee: $fee
      userId: $userId
    ) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`

export const DeleteDeliveryFee = gql`
  mutation deleteDeliveryFee($deliveryFeeId: Uuid!) {
    deleteDeliveryFee(deliveryFeeId: $deliveryFeeId) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
