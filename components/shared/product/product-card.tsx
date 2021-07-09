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
  margin: 0 auto;
`;

const ProductContainer = styled.div`
  background-color: rgba(248, 245, 240, 0.4);
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;
  margin: 0 auto;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 186px;
  min-width: 345px;
  object-fit: contain;
  padding-top: 10px;
  margin-bottom: 44px;
  mix-blend-mode: darken;
  \ @media ${mediaQueries.tablet} {
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
