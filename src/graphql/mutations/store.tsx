import gql from 'graphql-tag'

export const CreateProductGQL = gql`
  mutation CreateProduct($params: ProductGroupInput!) {
    createProduct(params: $params) {
      fieldErrors {
        key
        message
      }
      success
      data {
        ... on Product {
          id
          description
          costPrice
          sellingPrice
          minimumSku
          number: sku
          name
          featuredImage
          images
          user {
            id
            firstName
            lastName
          }
          categories {
            id
            title
          }

          tags {
            name
            id
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
