import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MenuProduct from "../fragments/menu-product.graphql";

const SEARCH = gql`
  query MenuSearch {
    menu(filter: { search: "lightning" }) {
      products {
        product {
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
    }
  }
`;

export default SEARCH;
