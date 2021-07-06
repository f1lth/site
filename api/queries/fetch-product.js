import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const FETCH_DATA = gql`
  query fetchProduct($id: ID!) {
    product(id: $id) {
      name
      brand {
        name
      }
      category
      image
      description
      strainType
      variants {
        option
        priceMed
        priceRec
        specialPriceMed
        specialPriceRec
      }
    }
  }
`;

export default FETCH_DATA;
