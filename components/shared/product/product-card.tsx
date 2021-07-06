import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuProductFragment } from "api/queries/menu.graphql";
import { deriveDisplayPrices } from "utils/product";

import { StrainTypeLabel } from "./strain-type-label";
import id from "components/pages/product/[id]";

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
  object-fit: contain;
  margin-bottom: 44px;
  mix-blend-mode: darken;
`;

const DisplayPrice = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const BrandName = styled.div`
  font-size: 13px;
  color: #1f2b49;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const ProductName = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #1f2b49;
  margin-top: 17px;
  margin-bottom: 13px;
  max-width: 225px;
`;
