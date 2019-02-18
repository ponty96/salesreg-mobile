import gql from 'graphql-tag'

export const UpsertBonanza = gql`
  mutation upsertBonanza($bonanzaId: Uuid, $bonanza: BonanzaInput!) {
    upsertBonanza(bonanzaId: $bonanzaId, bonanza: $bonanza) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Bonanza {
          id
          title
          startDate
          endDate
          date: startDate
          coverPhoto
          bonanzaItems {
            id
            product {
              id
              name
            }
            maxQuantity
            priceSlashTo
          }
        }
      }
    }
  }
`
