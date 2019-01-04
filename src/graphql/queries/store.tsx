import gql from 'graphql-tag'

export const ListCompanyProductsGQL = gql`
  query listCompanyProducts(
    $companyId: Uuid!
    $after: String
    $first: Int
    $queryText: String!
  ) {
    listCompanyProducts(
      companyId: $companyId
      after: $after
      first: $first
      query: $queryText
    ) {
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
          totalQuantitySold

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
              id
            }
          }

          productGroup {
            id
            title
            options {
              optionId: id
              optionName: name
              title: name
              id
            }
          }
        }
      }
    }
  }
`

export const ListCompanyCategoriesGQL = gql`
  query listCompanyCategories(
    $companyId: Uuid!
    $after: String
    $first: Int
    $queryText: String!
  ) {
    listCompanyCategories(
      companyId: $companyId
      after: $after
      first: $first
      query: $queryText
    ) {
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
  query listCompanyOptions(
    $companyId: Uuid!
    $after: String
    $first: Int
    $queryText: String!
  ) {
    listCompanyOptions(
      companyId: $companyId
      after: $after
      first: $first
      query: $queryText
    ) {
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

// export const ListCompanyProductGroupsGQL = gql`
//   query listCompanyProductGroups($companyId: Uuid!) {
//     listCompanyProductGroups(companyId: $companyId) {
//       title
//       id

//       options {
//         optionId: id
//         optionName: name
//       }
//     }
//   }
// `

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

export const SearchProductsByName = gql`
  query searchProductsByName($queryText: String!, $companyId: Uuid!) {
    searchProductsByName(companyId: $companyId, query: $queryText) {
      id
      name
      price
      sku
    }
  }
`
