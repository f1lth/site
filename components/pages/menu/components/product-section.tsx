import { Category, Effects } from "api/queries/menu.graphql";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueries } from "styles/media-queries";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { useSearchQuery } from "api/queries/search.graphql";
import { useMenuQuery } from "api/queries/menu.graphql";
import styled from "styled-components";

interface ProductSectionProps {
  category: Category | "";
  effects: Effects[] | "";
  numOfSelectedEffects: number;
  query: string;
}

export function ProductSection(props: ProductSectionProps): JSX.Element {
  const { category, effects, numOfSelectedEffects, query } = props;

  if (query == "") {
    const { data } = useMenuQuery({
      variables: {
        category: category as Category,
      },
    });
    const products = data?.menu?.products;
    let productCard;

    if (numOfSelectedEffects === 0) {
      productCard = (products || []).map((product) => (
        <ProductCard key={product.id} product={product} />
      ));
    } else {
      const productAdded: string[] = [];
      productCard = (products || []).map((product) =>
        product.effects.map((e) => {
          if (effects.includes(e) && !productAdded.includes(product?.name)) {
            // Check if a product have been pushed to array already or not
            productAdded.push(product?.name);
            return <ProductCard key={product.id} product={product} />;
          }
          return null;
        })
      );
    }
    return (
      <Section>
        <SectionHeader>
          {displayNameForCategory(category as Category)}
        </SectionHeader>
        <Grid>{productCard}</Grid>
      </Section>
    );
  } else {
    const { loading, error, data } = useSearchQuery({
      variables: {
        filter: query,
      },
    });

    if (loading)
      return (
        <Container>
          <LoadingSpinner />
        </Container>
      );
    if (error) console.log(`Error: ${error.message}`);
    const products = data?.menu?.products;
    let productCard;
    const productAdded: string[] = [];
    productCard = (products || []).map((product) => {
      if (!productAdded.includes(product?.name)) {
        // Check if a product have been pushed to array already or not
        productAdded.push(product?.name);
        return <ProductCard key={product.id} product={product} />;
      }
      return null;
    });
    return (
      <Section>
        <SectionHeader> Search results: ({productCard.length}) </SectionHeader>
        <Grid>{productCard}</Grid>
      </Section>
    );
  }
}

const Section = styled.section`
  margin-bottom: 64px;

  @media ${mediaQueries.tablet} {
    margin-bottom: 50px;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;

  @media ${mediaQueries.tablet} {
    width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  @media ${mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }
  @media ${mediaQueries.phone} {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
`;

const SectionHeader = styled.h2`
  font-family: "inter";
`;
