import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { initializeApollo } from "api/apollo";
import { MenuDocument, Category, useMenuQuery } from "api/queries/menu.graphql";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";

import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { LoadingSpinner } from "components/shared/loading-spinner";

import ProductInfo from "./components/product-info";
import MobileProductInfo from "./components/mobile-product-info";
import Recommendation from "./components/recommendation";

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

function Product(): JSX.Element {
  const router = useRouter();
  const checkoutContext = useCheckout();
  const { name, category } = router.query;
  const { loading, error, data } = useMenuQuery({
    variables: {
      category: category as Category,
    },
  });
  let product = { image: "", description: "" } as any;
  let recommendation = [] as any;

  function formatProductName(name: string) {
    return name
      .replace(/([~!@#$%^&*()_+=`{}\[\]\|\-\:;'<>,.\/? ])+/g, "-")
      .replace(/^(-)+|(-)+$/g, "");
  }

  data?.menu?.products.forEach((p) => {
    if (formatProductName(p.name) === name) {
      product = p;
    } else {
      recommendation.push(p);
    }
  });

  if (loading)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  if (error) console.log(`Error: ${error.message}`);
  if (!data) console.log(`Product ID ${id} Not found`);

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav page="product" />
        <Content>
          <Grid>
            <GridItem>
              <Image src={product.image} />
            </GridItem>
            <GridItem>
              <ProductInfo product={product} />
            </GridItem>
          </Grid>
          <Recommendation products={recommendation} />
        </Content>
        <Footer />
      </Container>
    </CheckoutContext.Provider>
  );
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background-color: #ffffff;

  @media ${mediaQueries.phone} {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 25px;
  align-items: center;
`;

const Image = styled.img`
  margin-top: 100px;
  width: 100%;
  height: 386px;
  position: relative;
  object-fit: contain;
  mix-blend-mode: darken;
  display: flex;
  @media ${mediaQueries.tablet} {
    margin-top: 10px;
    max-height: 400px;
  }
`;

const Grid = styled.div`
  display: grid;
  overflow: hidden;
  margin-top: 40px;
  grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
  gap: 103px;
  @media ${mediaQueries.largeTablet} {
    grid-template-columns: 1fr;
    margin-top: 0px;
    gap: 40px;
    margin-bottom: 40px;
  }
`;

const GridItem = styled.div`
  display: inline-block;
  display: flex;
  justify-content: flex;
  object-fit: cover;
  overflow: hidden;
  height: 800px;
  width: auto;
  @media ${mediaQueries.tablet} {
    height: auto;
  }
`;

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
