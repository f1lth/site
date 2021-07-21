import { GetStaticProps } from "next";
import styled from "styled-components";

import { initializeApollo } from "api/apollo";
import { HomePageMenuDocument } from "api/queries/home-page-menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueries } from "styles/media-queries";

import {
  ShopSection,
  SHOP_SECTION_CATEGORIES,
} from "./components/shop-section";
import { HeroSection } from "./components/hero-section";
import { CartSection } from "components/pages/cart/components/cart-section";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  margin-top: -40px;
  background-color: #ffffff;
`;

function Home(): React.ReactNode {
  const checkoutContext = useCheckout();

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav />
        <HeroSection />
        <Footer />
      </Container>
    </CheckoutContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  const apolloClient = initializeApollo();

  const queries = [undefined, ...SHOP_SECTION_CATEGORIES].map((category) =>
    apolloClient.query({
      query: HomePageMenuDocument,
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

export default Home;
