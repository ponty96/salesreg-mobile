import gql from 'graphql-tag'

export const ListCompanyProductsGQL = gql`
  query listCompanyProducts($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyProducts(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          description
          costPrice
          price
          minimumSku
          number: sku
          name
          featuredImage
          images
          isFeatured
          isTopRatedByMerchant
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

          optionValues {
            id
            name
            option {
              name
            }
          }
        }
      }
    }
  }
`

export const ListCompanyServicesGQL = gql`
  query listCompanyServices($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyServices(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          description
          id
          name
          price
          categories {
            id
            title
          }
          isFeatured
          isTopRatedByMerchant
          featuredImage
          images
          tags {
            name
            id
          }
        }
      }
    }
  }
`

export const ListCompanyCategoriesGQL = gql`
  query listCompanyCategories($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyCategories(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          description
          id
          title
        }
      }
    }
  }
`

export const ListCompanyOptionsGQL = gql`
  query listCompanyOptions($companyId: Uuid!, $after: String, $first: Int) {
    listCompanyOptions(companyId: $companyId, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          name
        }
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

export const SearchProductGroupsByTitleGQL = gql`
  query searchProductGroupsByTitle($companyId: Uuid!, $queryText: String!) {
    searchProductGroupsByTitle(companyId: $companyId, query: $queryText) {
      title
      id

      options {
        optionId: id
        optionName: name
      }

      products {
        id
        description
        price
        minimumSku
        sku
        name
        featuredImage
        images
        isFeatured
        isTopRatedByMerchant
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
`

export const SearchCategoriesByTitleGQL = gql`
  query searchCategoriesByTitle($companyId: Uuid!, $queryText: String!) {
    searchCategoriesByTitle(companyId: $companyId, query: $queryText) {
      title
      id
    }
  }
`

export const SearchOptionsByNameGQL = gql`
  query searchOptionsByName($companyId: Uuid!, $queryText: String!) {
    searchOptionsByName(companyId: $companyId, query: $queryText) {
      optionId: id
      optionName: name
      title: name
      id
    }
  }
`
