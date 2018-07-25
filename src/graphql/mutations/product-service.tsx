import gql from 'graphql-tag';

export const UpsertProductGQL = gql`
  mutation UpsertProduct(
    $productId: Uuid
    $companyId: Uuid!
    $costPrice: String!
    $description: String
    $featuredImage: String!
    $minimumStockQuantity: String!
    $name: String!
    $sellingPrice: String!
    $stockQuantity: String!
    $userId: Uuid!
  ) {
    upsertProduct(
      product: {
        companyId: $companyId
        costPrice: $costPrice
        description: $description
        featuredImage: $featuredImage
        minimumStockQuantity: $minimumStockQuantity
        name: $name
        sellingPrice: $sellingPrice
        stockQuantity: $stockQuantity
        userId: $userId
      }
      productId: $productId
    ) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Product {
          id
          description
          image: featuredImage
          costPrice
          sellingPrice
          minimumStockQuantity
          number: stockQuantity
          name
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;
