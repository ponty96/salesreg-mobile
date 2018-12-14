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
          price
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

export const DeleteProductGQL = gql`
  mutation deleteProduct($productId: Uuid!) {
    deleteProduct(productId: $productId) {
      success
      fieldErrors {
        key
        message
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

export const DeleteServiceGQL = gql`
  mutation deleteService($serviceId: Uuid!) {
    deleteService(serviceId: $serviceId) {
      success
      fieldErrors {
        key
        message
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

export const DeleteCategoryGQL = gql`
  mutation DeleteCategory($categoryId: Uuid!) {
    deleteCategory(categoryId: $categoryId) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
