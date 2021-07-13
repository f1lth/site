import { Fragment, useContext } from "react";
import styled from "styled-components";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import Button from "@material-ui/core/Button";

import { OrderType, PricingType } from "api/queries/checkout.graphql";
import { CheckoutItemFragment } from "api/fragments/checkout-item.graphql";
import { useRemoveItemFromCheckoutMutation } from "api/mutations/remove-item-from-checkout.graphql";
import { useUpdateCheckoutItemQuantityMutation } from "api/mutations/update-checkout-item-quantity.graphql";
import { useUpdateCheckoutMutation } from "api/mutations/update-checkout.graphql";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { CheckoutContext } from "components/shared/checkout-context";
import { mediaQueries } from "styles/media-queries";
import { formatPrice } from "utils/number-format";

import { CartItem } from "./cart-item";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { CloseButton } from "components/shared/svg/close-button";

interface CartProps {
  onClose: () => void;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export function Cart(props: CartProps): JSX.Element {
  const { onClose } = props;
  const { checkout, loading: isCheckoutLoading } = useContext(CheckoutContext);

  const checkoutId = checkout?.id || "";
  const checkoutItems = checkout?.items;
  const checkoutOrderType = checkout?.orderType || OrderType.Delivery;
  const otherOrderType =
    checkoutOrderType === OrderType.Delivery
      ? OrderType.Pickup
      : OrderType.Delivery;
  const checkoutPricingType = checkout?.pricingType;

  // MUTATIONS
  const [
    removeItemFromCheckout,
    { loading: isRemoveItemLoading },
  ] = useRemoveItemFromCheckoutMutation();
  async function handleRemoveItemFromCheckout(item: CheckoutItemFragment) {
    await removeItemFromCheckout({
      variables: {
        checkoutId,
        itemId: item.id,
      },
    });
  }

  const [
    updateCheckoutItemQuantity,
    { loading: isUpdateQuantityLoading },
  ] = useUpdateCheckoutItemQuantityMutation();
  async function handleCheckoutQuantityUpdate(
    item: CheckoutItemFragment,
    newQuantity: number
  ) {
    await updateCheckoutItemQuantity({
      variables: {
        checkoutId,
        itemId: item.id,
        quantity: newQuantity,
      },
    });
  }

  const [
    updateCheckout,
    { loading: isUpdateCheckoutLoading },
  ] = useUpdateCheckoutMutation();
  async function handleCheckoutOrderTypeToggle() {
    await updateCheckout({
      variables: {
        checkoutId,
        pricingType: checkoutPricingType || PricingType.Recreational,
        orderType: otherOrderType,
      },
    });
  }

  const isCheckoutOperationLoading =
    isCheckoutLoading ||
    isRemoveItemLoading ||
    isUpdateQuantityLoading ||
    isUpdateCheckoutLoading;

  const headerAndDeliveryInfo = (
    <>
      <Header>
        <HeaderLabel>
          YOUR CART
          {isCheckoutOperationLoading && (
            <CheckoutLoadingSpinner isInline size={18} />
          )}
        </HeaderLabel>
        <HeaderCloseButton onClick={onClose}>Close</HeaderCloseButton>
      </Header>
    </>
  );

  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <Container>
        {headerAndDeliveryInfo}
        <EmptyCart>This cart is empty :(</EmptyCart>
      </Container>
    );
  }

  // These calculations will eventually come from the API
  function costOfCheckoutItem(item: CheckoutItemFragment): number {
    const itemPrice =
      item.product.variants.find(
        (variant: any) => variant.option === item.option
      )?.priceRec || 0;
    return itemPrice * item.quantity;
  }

  function totalCostDisplayValue(items: CheckoutItemFragment[]): string {
    const totalPrice = items.reduce((acc, item) => {
      return acc + costOfCheckoutItem(item);
    }, 0);
    return formatPrice(totalPrice);
  }

  return (
    <Container>
      <DesktopOnly>
        {headerAndDeliveryInfo}
        <Tags>
          <Label>PRODUCT</Label>
          <Label>QUANTITY</Label>
          <Label>TOTAL</Label>
        </Tags>

        <CheckoutItems>
          {checkoutItems.map((item: any) => (
            <Fragment key={item.id}>
              <CartItem
                item={item}
                handleCheckoutQuantityUpdate={handleCheckoutQuantityUpdate}
                handleRemoveItemFromCheckout={handleRemoveItemFromCheckout}
                costOfCheckoutItem={costOfCheckoutItem}
              />
            </Fragment>
          ))}
        </CheckoutItems>

        <ButtonContainer>
          <Label> Subtotal ‎‎‎‎ {totalCostDisplayValue(checkoutItems)} </Label>
          Excluding taxes & shipping
          <StyledButton href={checkout?.redirectUrl}>Checkout</StyledButton>
        </ButtonContainer>
      </DesktopOnly>
      <MobileOnly>
        <Tags>
          <Label>Shopping Cart</Label>
          <CloseButton width={70} height={70} color="#fff" onClick={onClose} />
        </Tags>
        <CheckoutItems>
          {checkoutItems.map((item: any) => (
            <Fragment key={item.id}>
              <CartItem
                item={item}
                handleCheckoutQuantityUpdate={handleCheckoutQuantityUpdate}
                handleRemoveItemFromCheckout={handleRemoveItemFromCheckout}
                costOfCheckoutItem={costOfCheckoutItem}
              />
            </Fragment>
          ))}
        </CheckoutItems>
        <Divider />
        <ButtonContainer>
          <Label> Subtotal ‎‎‎‎ {totalCostDisplayValue(checkoutItems)} </Label>
          Excluding taxes & shipping
          <StyledButton href={checkout?.redirectUrl}>Checkout</StyledButton>
        </ButtonContainer>
      </MobileOnly>
    </Container>
  );
}

const CheckoutItems = styled.div`
  padding: 40px 30px 10px 25px;
`;

const Divider = styled.div`
  background-color: rgba(251, 251, 251, 0.5);
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
  margin-right: 5%;
  height: 1.01px; //hacky but divider.
`;

const Container = styled.div`
  width: 100vw;
  background-color: black;
`;

const Tags = styled.div`
  display: flex;
  padding-left: 30px;
  padding-right: 40px;
  flex-direction: row;
  justify-content: space-between;
  @media ${mediaQueries.tablet} {
    padding-left: 30px;
    padding-right: 8px;
  }
`;

const Header = styled.div`
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 25px 25px 29px;
`;

const HeaderLabel = styled.div`
  font-family: "inter";
  font-size: 40px;
  font-weight: 700;
  display: flex;
  color: white;
  align-items: center;
`;

const Label = styled.div`
  font-family: "inter";
  font-size: 20px;
  font-weight: 600;
  display: flex;
  color: white;
  align-items: center;
`;

const HeaderCloseButton = styled.button`
  border: 1px solid #d9d6d2;
  background-color: #ffffff;
  color: rgb(166, 161, 155);
  padding: 10px 29px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  color: white;
  padding: 40px;
`;

const ButtonContainer = styled.div`
  margin: 0 25px;
  position: relative;
  width: 100%;
  justify-content: start;
  color: white;
`;

const StyledButton = styled(Button)`
  border-radius: 2px !important;
  text-transform: none !important;
  background-color: #fff !important;
  width: 20vw;
  height: 58px;
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  & .MuiButton-label {
    color: #ffffff !important;
  }
  &:hover {
    background-color: #246e84 !important;
  }
  @media ${mediaQueries.tablet} {
    width: 220px;
    height: 40px;
  }
`;

const CheckoutLoadingSpinner = styled(LoadingSpinner)`
  margin-left: 8px;
`;
