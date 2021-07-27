import styled from "styled-components";
import { useRouter } from "next/router";
import { MenuProductFragment } from "api/queries/menu.graphql";
import { deriveDisplayPrices } from "utils/product";
import { mediaQueries } from "styles/media-queries";
import { useState } from "react";

interface ProductCardProps {
  product: MenuProductFragment;
}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { product } = props;
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

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

  function handleHover() {
    setIsHover(true);
  }

  function handleHoverLeave() {
    setIsHover(false);
  }

  return (
    <>
      <Container
        onClick={() => handleProductRoute(product.name, product.category)}
      >          

        <ProductContainer onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>
          
          <ProductImage src={product.image} />
          {isHover && (
            <CTA > Quick add </CTA>
          )}
          

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
  padding: 0px 10px px 5px;
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;

`;

const ProductContainer = styled.div`
  background-color: #f2f2f2;
  position: relative;
  padding: 2em 1em;
  display: flex;
  align-items: center;
  width: auto;
  height: inherit;
  &:hover {
    background-color: #04a09a;
  }
`;

const CTA = styled.a`
  z-index: 1;
  position: absolute;
  bottom: 2em;
  right: 0;
  left: 0;
  display: flex;
  text-align: center;
  margin: auto;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: white;

  cursor: pointer;
  font-size: 17px;
  font-weight: 400;
  width: 198px;
  height: 44px;

  @media ${mediaQueries.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 142px;
    margin-top: 3px;
    height: 40px;
    font-size: 14px;
  }

  &:hover {
    background-color: #04a09a !important;
  }
`;


const ProductImage = styled.img`
  max-width: 340px;
  width: 100%;
  height: 186px;
  display: flex;
  object-fit: contain;
  
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
  margin-bottom: 6px;
  max-width: 225px;
`;
