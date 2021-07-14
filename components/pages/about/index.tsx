import { GetStaticProps } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryParam } from "use-query-params";

import { initializeApollo } from "api/apollo";
import { MenuDocument, Category, Effects } from "api/queries/menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueries } from "styles/media-queries";
import { CategoriesParam } from "utils/query-param";
import { EffectsParam } from "utils/query-param";

import { Info } from "./components/info";

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

const ProductSectionEffectsNames = [
  Effects.Calm,
  Effects.ClearMind,
  Effects.Creative,
  Effects.Energetic,
  Effects.Focused,
  Effects.Happy,
  Effects.Inspired,
  Effects.Relaxed,
  Effects.Sleepy,
  Effects.Uplifted,
];

function About(): JSX.Element {
  return (
    <Container>
      <Nav darkBackground page="menu" />
      <Content>
        <div>
          <Info />
        </div>
      </Content>
      <Footer />
    </Container>
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
  padding: 45px;
  display: flex;

  @media ${mediaQueries.largeTablet} {
    flex-direction: column;
    padding: 18px 25px;
  }
`;

export default About;
