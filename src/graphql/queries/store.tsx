import gql from 'graphql-tag'

export const ListCompanyProductsGQL = gql`
  query listCompanyProducts($companyId: Uuid!) {
    listCompanyProducts(companyId: $companyId) {
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
      featuredImage
      images
      tags {
        name
        id
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
        id
        sellingPrice
        featuredImage
        images
      }

      services {
        name
        id
        price
        featuredImage
        images
      }
    }
  }
`

export const ListCompanyProductGroupsGQL = gql`
  query listCompanyProductGroups($companyId: Uuid!) {
    listCompanyProductGroups(companyId: $companyId) {
      title
      id

      options {
        optionId: id
        optionName: name
      }
    }
  }
`
