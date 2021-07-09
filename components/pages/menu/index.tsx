import { GetStaticProps } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryParam } from "use-query-params";

import { initializeApollo } from "api/apollo";
import { MenuDocument, Category, Effects } from "api/queries/menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueries } from "styles/media-queries";
import { CategoriesParam } from "utils/query-param";
import { EffectsParam } from "utils/query-param";

import { CategoryFilter } from "./components/filters/category-filter";
import { EffectsFilter } from "./components/filters/effect-filter";
import { MobileFilters } from "./components/filters/mobile-filters";
import { ProductSection } from "./components/product-section";

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

function Menu(): JSX.Element {
  const router = useRouter();
  const { q } = router.query;

  const [selectedCategories, setSelectedCategories] = useQueryParam(
    "category",
    CategoriesParam
  );

  const [selectedEffects, setSelectedEffects] = useQueryParam(
    "effects",
    EffectsParam
  );

  const checkoutContext = useCheckout();

  function onCategorySelect(category: Category) {
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
  }

  function onEffectsSelect(effects: Effects) {
    if (selectedEffects.has(effects)) {
      selectedEffects.delete(effects);
    } else {
      selectedEffects.add(effects);
    }
    setSelectedEffects(selectedEffects);
  }

  function selectSingleCategory(category?: Category) {
    selectedCategories.clear();
    if (category) {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
  }

  function selectSingleEffect(effect?: Effects) {
    selectedEffects.clear();
    if (effect) {
      selectedEffects.add(effect);
    }
    setSelectedCategories(selectedCategories);
  }

  const categoriesToShow =
    selectedCategories.size === 0
      ? ProductSectionCategories
      : ProductSectionCategories.filter((category) =>
          selectedCategories.has(category)
        );

  const effectsToShow =
    selectedEffects.size === 0
      ? ProductSectionEffectsNames
      : ProductSectionEffectsNames.filter((effects) =>
          selectedEffects.has(effects)
        );

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav
          darkBackground
          page="menu"
          selectSingleCategory={selectSingleCategory}
          selectSingleEffects={selectSingleEffect}
        />
        <Content>
          <DesktopOnly>
            <Sidebar>
              <CategoryFilter
                selectedCategories={selectedCategories}
                onCategorySelect={onCategorySelect}
              />
              <EffectsFilter
                selectedEffects={selectedEffects}
                onEffectSelect={onEffectsSelect}
              />
            </Sidebar>
          </DesktopOnly>
          <MobileOnly>
            <MobileFilters
              selectedCategories={selectedCategories}
              selectSingleCategory={selectSingleCategory}
            />
          </MobileOnly>
          <div>
            {categoriesToShow.map((category) => (
              <ProductSection
                key={category}
                category={category}
                effects={effectsToShow}
                numOfSelectedEffects={effectsToShow.length}
                query={q}
              />
            ))}
          </div>
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
  padding: 45px;
  display: flex;

  @media ${mediaQueries.largeTablet} {
    flex-direction: column;
    padding: 18px 25px;
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  margin-right: 36px;
  flex-shrink: 0;
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

export default Menu;
