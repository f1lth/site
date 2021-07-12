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

export function shuffle(array) {
  //https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
  var i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
