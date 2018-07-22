import gql from 'graphql-tag';

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
    }
  }
`;
