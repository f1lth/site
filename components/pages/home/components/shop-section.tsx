import { useState } from "react";
import {
  useHomePageMenuQuery,
  Category,
} from "api/queries/home-page-menu.graphql";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueries } from "styles/media-queries";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export const SHOP_SECTION_CATEGORIES = [
  Category.Flower,
  Category.Concentrates,
  Category.Edibles,
  Category.Topicals,
];

type CategorySelectOption = Category | typeof ALL_TOP_PRODUCTS | undefined;

const ALL_TOP_PRODUCTS = "All top products";

export function ShopSection(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<
    CategorySelectOption
  >(ALL_TOP_PRODUCTS);

  const { data } = useHomePageMenuQuery({
    variables: {
      category:
        selectedCategory === ALL_TOP_PRODUCTS ? undefined : selectedCategory,
    },
  });

  return (
    <Section>
      <FeaturedContainer>
        <FeaturedImage />
        <Description>
          Shop / Categories / Flower
          <Header> Green Crack </Header>
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.
          <InfoContainer>
            <Circle>THC 24%</Circle>
            <Circle>CBD 0.7%</Circle>
            <Circle>1G</Circle>
          </InfoContainer>
          <CTAContainer>
            <CTA href="product?&name=Green-Crack">Shop now</CTA>
          </CTAContainer>
        </Description>
      </FeaturedContainer>
      <DesktopOnly>
        <CategoryListItem
          key={SHOP_SECTION_CATEGORIES[0]}
          isSelected={selectedCategory === SHOP_SECTION_CATEGORIES[0]}
          onClick={() => setSelectedCategory(SHOP_SECTION_CATEGORIES[0])}
        >
          <Subheader>Shop Best Sellers</Subheader>
        </CategoryListItem>
      </DesktopOnly>
      <MobileOnly>
        <Subheader> Shop Best Sellers </Subheader>
      </MobileOnly>
      <Grid>
        {data?.menu?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding: 70px 27px 80px 27px;
  @media ${mediaQueries.tablet} {
    padding: 20px 27px 30px 27px;
  }
`;

const Header = styled.h2`
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  color: #000;
  margin-top: 18px;
  margin-bottom: 28px;

  @media ${mediaQueries.tablet} {
    font-size: 34px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

const Subheader = styled.h2`
  font-size: 34px;
  font-weight: 500;
  text-align: left;
  color: #000;
  font-family: "inter";

  @media ${mediaQueries.tablet} {
    font-size: 34px;
  }
`;

const FeaturedContainer = styled.div`
  display: grid;
  width: 100%;
  height: 700px;
  grid-template-rows: 600px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;

  @media ${mediaQueries.tablet} {
    height: 800px;
    margin-top: 10px;
    margin-bottom: 50px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  height: auto;
  justify-content: space-between;
  margin-top: 40px;
  padding-left: 70px;
  padding-right: 70px;

  @media ${mediaQueries.tablet} {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
  }
`;

const FeaturedImage = styled.img`
  background: url("images/ft.png") no-repeat center center;
  background-size: cover;
  height: 100%;
  width: 100%;
  @media ${mediaQueries.tablet} {
    height: 400px;
  }
`;

const Description = styled.div`
  background-color: rgba(242, 242, 242, 100);
  text-align: center;
  height: auto;
  padding-top: 80px;
  width: auto;
  @media ${mediaQueries.tablet} {
    height: 400px;
    padding-top: 40px;
  }
`;

const CategoryListItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  display: inline;
  margin-right: 55px;
  padding-bottom: 3px;
  &:last-of-type {
    margin-right: 0px;
  }

  ${(props) => props.isSelected && "border-bottom: 3px solid #000;"}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 40%) minmax(auto, 40%) minmax(auto, 40%);
  grid-template-rows: 310px;
  gap: 20px;
  justify-content: center;

  @media ${mediaQueries.largeTablet} {
    grid-template-columns: 340px 340px;
  }

  @media ${mediaQueries.largePhone} {
    grid-template-columns: 100%;
    margin-bottom: 60px;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  @media ${mediaQueries.tablet} {
    margin-top: 10px;
  }
`;

const CTA = styled.a`
  background-color: #000;
  color: white;
  width: 230px;
  height: 44px;
  padding: 11px 35px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #04a09a;
  }
`;

const MobileCategorySelect = styled(Select)`
  width: 100%;
  height: 58px;
  border-radius: 0px !important;
  margin-bottom: 24px;
  font-size:
  max-width: 323px;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 15px;
  }
`;

const Circle = styled.div`
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  display: "flex";
  height: 90px;
  width: 90px;
  font-size: 21px;
  color: #000;
  fill: "none";
  border: 1px solid #000000;
  margin-bottom: 36px;

  @media ${mediaQueries.tablet} {
    height: 70px;
    width: 70px;
    font-size: 17px;
  }
`;
