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

export const UpdateProductGQL = gql`
  mutation UpdateProduct($params: ProductInput!, $id: Uuid!) {
    updateProduct(product: $params, productId: $id) {
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

export const RestockProducts = gql`
  mutation restockProducts($items: [RestockItemInput]) {
    restockProducts(items: $items) {
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

export const UpsertOptionGQL = gql`
  mutation UpsertOption($optionId: Uuid, $option: OptionInput!) {
    upsertOption(optionId: $optionId, option: $option) {
      success
      fieldErrors {
        key
        message
      }
      data {
        ... on Option {
          id
          name
        }
      }
    }
  }
`

export const UpdateProductGroupOptionsGQL = gql`
  mutation UpdateProductGroupOptions(
    $productGroupId: Uuid!
    $options: [Uuid]!
  ) {
    updateProductGroupOptions(id: $productGroupId, options: $options) {
      success
      fieldErrors {
        key
        message
      }
    }
  }
`
