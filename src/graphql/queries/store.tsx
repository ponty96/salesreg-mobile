import gql from 'graphql-tag'

export const ListCompanyProductsGQL = gql`
  query listCompanyProducts($companyId: Uuid!) {
    listCompanyProducts(companyId: $companyId) {
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
      categories {
        id
        title
      }
    }
  }
`

export const ListCompanyServicesGQL = gql`
  query listCompanyServices($companyId: Uuid!) {
    listCompanyServices(companyId: $companyId) {
      description
      id
      name
      price
      categories {
        id
        title
      }
    }
  }
`

export const ListCompanyCategoriesGQL = gql`
  query listCompanyCategories($companyId: Uuid!) {
    listCompanyCategories(companyId: $companyId) {
      description
      id
      title

      products {
        name
        featuredImage
        id
        sellingPrice
      }

      services {
        name
        id
        price
      }
    }
  }
`
