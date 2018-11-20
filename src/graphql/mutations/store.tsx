import gql from 'graphql-tag'

export const UpsertProductGQL = gql`
  mutation UpsertProduct(
    $productId: Uuid
    $companyId: Uuid!
    $costPrice: String!
    $description: String
    $featuredImage: String
    $minimumSku: String!
    $name: String!
    $sellingPrice: String!
    $sku: String!
    $userId: Uuid!
  ) {
    upsertProduct(
      product: {
        companyId: $companyId
        costPrice: $costPrice
        description: $description
        featuredImage: $featuredImage
        minimumSku: $minimumSku
        name: $name
        sellingPrice: $sellingPrice
        sku: $sku
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
          minimumSku
          number: sku
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
`

export const UpsertServiceGQL = gql`
  mutation UpsertService($serviceId: Uuid, $service: ServiceInput!) {
    upsertService(service: $service, serviceId: $serviceId) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Service {
          id
          name
          price
        }
      }
    }
  }
`

export const UpsertCategoryGQL = gql`
  mutation UpsertCategory($categoryId: Uuid, $category: CategoryInput!) {
    upsertCategory(categoryId: $categoryId, category: $category) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Category {
          id
          title
          description
        }
      }
    }
  }
`
