import styled from "styled-components";
import { useRouter } from "next/router";
import { MenuProductFragment } from "api/queries/menu.graphql";
import { deriveDisplayPrices } from "utils/product";
import { mediaQueries } from "styles/media-queries";

interface ProductCardProps {
  product: MenuProductFragment;
}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { product } = props;
  const router = useRouter();

  function formatProductName(name: string) {
    return name
      .replace(/([~!@#$%^&*()_+=`{}\[\]\|\-\:;'<>,.\/? ])+/g, "-")
      .replace(/^(-)+|(-)+$/g, "");
  }

  function handleProductRoute(name: string, category: string) {
    router.push(
      `/product?&name=${formatProductName(name)}&category=${category}`
    );
  }

  return (
    <>
      <Container
        onClick={() => handleProductRoute(product.name, product.category)}
      >
        <ProductContainer>
          <ProductImage src={product.image} />
        </ProductContainer>
        <ProductName>{product.name}</ProductName>
        <DisplayPrice>
          {/* TODO: determine when to show med vs rec */}
          {deriveDisplayPrices(product).rec}
        </DisplayPrice>
      </Container>
    </>
  );
}

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 25px;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%
  justify-content: center;
  margin: 0 auto;
`;

const ProductContainer = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  height: 186px;
  object-fit: contain;
  width: 100%;
  margin-bottom: 44px;
  mix-blend-mode: darken;
  @media ${mediaQueries.tablet} {
    min-width: 0;
  }
`;

const DisplayPrice = styled.div`
  font-size: 16px;
  font-family: "inter";
  margin-bottom: 8px;
`;

const ProductName = styled.div`
  font-size: 17px;
  font-family: "inter";
  font-weight: 600;
  color: #000;
  margin-top: 17px;
  margin-bottom: 13px;
  max-width: 225px;
`;
