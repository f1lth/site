import styled from "styled-components";
import Link from "next/link";
import { useState, useContext } from "react";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { mediaQueries } from "styles/media-queries";

import { LoadingSpinner } from "components/shared/loading-spinner";
import { CheckoutContext } from "components/shared/checkout-context";
import { MenuProductFragment } from "api/fragments/menu-product.graphql";
import { deriveDisplayPrices } from "utils/product";
import { useAddItemToCheckoutMutation } from "api/mutations/add-item-to-checkout.graphql";

import {
  getAllProductIDs,
  getPostData,
} from "components/pages/product2/components/util";

interface ProductInfoProps {
  product: MenuProductFragment;
}

export function Post(props: ProductInfoProps): JSX.Element {
  const { product } = props;
  const { checkout } = useContext(CheckoutContext);
  const [
    addItemToCheckoutMutation,
    { loading: addingToCart },
  ] = useAddItemToCheckoutMutation();

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0].option
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  async function handleAddToCartClick() {
    await addItemToCheckoutMutation({
      variables: {
        checkoutId: checkout?.id || "",
        productId: product.id,
        quantity: selectedQuantity,
        option: selectedVariant,
      },
    });
  }

  return (
    <div>
      <br />
      <br />
      aaa
    </div>
  );
}

export default Post;
