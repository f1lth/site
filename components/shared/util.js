import { initializeApollo } from "api/apollo";
import { useMenuQuery } from "api/queries/products.graphql";
import FETCH_DATA from "api/queries/fetch-product";
import SEARCH from "api/queries/search";
import { useQuery } from "@apollo/client";

export function getAllProductIDs() {
  const data = useMenuQuery();
  const products = data?.data?.menu?.products;
  return (products || []).map((page) => {
    return {
      params: {
        id: page,
      },
    };
  });
}

export function getPostData(product_id) {
  const data = useQuery(FETCH_DATA, { variables: { id: product_id } });
  const info = data?.data?.product;
  // Combine the data with the id
  return {
    product_id,
    info,
  };
}

export function search(query) {
  const data = useQuery(SEARCH, { variables: { query: query } });
  const info = data?.data?.product;
  // Combine the data with the id
  return {
    product_id,
    info,
  };
}
