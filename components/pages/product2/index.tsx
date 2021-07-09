import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { MenuDocument, Category, useMenuQuery } from "api/queries/menu.graphql";

import { initializeApollo } from "api/apollo";
import { HomePageMenuDocument } from "api/queries/home-page-menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueries } from "styles/media-queries";
import { getPostData } from "./components/util";
import { Post } from "./components/[id]";

const ProductSectionCategories = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
];

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background-color: #ffffff;

  @media ${mediaQueries.phone} {
    width: 100%;
  }
`;

function Product(): React.ReactNode {
  const router = useRouter();
  const { id, category } = router.query;
  const { loading, error, data } = useMenuQuery({
    variables: {
      category: category as Category,
    },
  });
  let product = { image: "", description: "" };
  const checkoutContext = useCheckout();

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav page="product" />
        <Post product={product} />
        <Footer />
      </Container>
    </CheckoutContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  const apolloClient = initializeApollo();

  const queries = ProductSectionCategories.map((category) =>
    apolloClient.query({
      query: MenuDocument,
      variables: {
        category,
      },
    })
  );

  await Promise.all(queries);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 10,
  };
};

export default Product;
