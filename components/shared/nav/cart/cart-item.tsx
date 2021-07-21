import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { CheckoutItemFragment } from "api/fragments/checkout-item.graphql";
import { CloseButton } from "components/shared/svg/close-button";
import { formatPrice } from "utils/number-format";
import { mediaQueries } from "styles/media-queries";
import styled from "styled-components";

interface CartItem {
  item: CheckoutItemFragment;
  handleCheckoutQuantityUpdate: (
    item: CheckoutItemFragment,
    newQuantity: number
  ) => void;
  handleRemoveItemFromCheckout: (item: CheckoutItemFragment) => void;
  costOfCheckoutItem: (item: CheckoutItemFragment) => number;
}

export function CartItem(props: CartItem): JSX.Element {
  const {
    item,
    handleCheckoutQuantityUpdate,
    handleRemoveItemFromCheckout,
    costOfCheckoutItem,
  } = props;

  function incrementProduct() {
    if (item.quantity >= 9) {
      console.log("nothing");
    } else {
      handleCheckoutQuantityUpdate(item, (item.quantity as number) + 1);
    }
  }

  function decrementProduct() {
    if (item.quantity <= 1) {
      console.log("nothing");
    } else {
      handleCheckoutQuantityUpdate(item, (item.quantity as number) - 1);
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <DesktopOnly>
        <CheckoutItem>
          <LeftSide>
            <CheckoutItemImageContainer>
              <CheckoutItemImage src={item.product.image} />
            </CheckoutItemImageContainer>
            <div>
              <ItemName>{item.product.name}</ItemName>
            </div>
          </LeftSide>
          <Center>
            <Circle onClick={() => decrementProduct()}>-</Circle>
            <ItemName> {item.quantity} </ItemName>
            <Circle onClick={() => incrementProduct()}>+</Circle>
          </Center>
          <RightSide>
            <Price>{formatPrice(costOfCheckoutItem(item))}</Price>
            <CloseButton
              height={30}
              width={30}
              onClick={() => handleRemoveItemFromCheckout(item)}
              color="#fff"
            />
          </RightSide>
        </CheckoutItem>
      </DesktopOnly>
      <MobileOnly>
        <Center>
          <CheckoutItemImageContainer>
            <CheckoutItemImage src={item.product.image} />
          </CheckoutItemImageContainer>
          <ItemName> {item.product.name}</ItemName>
        </Center>
        <Center>
          <CheckoutItem>
            <Circle onClick={() => decrementProduct()}>-</Circle>
            <ItemName> {item.quantity} </ItemName>
            <Circle onClick={() => incrementProduct()}>+</Circle>
          </CheckoutItem>
          <CheckoutItem>
            <Price>{formatPrice(costOfCheckoutItem(item))}</Price>
            <CloseButton
              height={30}
              width={30}
              onClick={() => handleRemoveItemFromCheckout(item)}
              color="#fff"
            />
          </CheckoutItem>
        </Center>
      </MobileOnly>
    </MuiThemeProvider>
  );
}

const CheckoutItem = styled.div`
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const LeftSide = styled.div`
  display: flex;
  width: 290px;
  color: white;
  align-items: center;
`;

const Center = styled.div`
  display: flex;
  margin-left: -145px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media ${mediaQueries.tablet} {
    width: 100%;
    margin-top: 10px;
    margin-left: 0px;
  }
`;

const RightSide = styled.div`
  display: flex;
  float: right;
  color: white
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ItemName = styled.div`
  font-size: 18px;
  font-weight: 400;
  font-family: "visuelt";
  color: white;
  margin-left: 12px;
  margin-right: 12px;
`;

const Price = styled.div`
  font-size: 14px;
  width: 77px;
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const CheckoutItemImageContainer = styled.div`
  height: 70px;
  width: 70px;
  border: 1px solid rgba(160, 153, 142, 0.4);
  background-color: rgba(255, 255, 250, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
`;

const CheckoutItemImage = styled.img`
  height: 55px;
  width: 55px;
  object-fit: contain;
`;

const Circle = styled.div`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 43.94px;
  width: 43.94px;
  font-size: 21px;
  color: #fff;
  fill: "none";
  cursor: pointer;
  border: 1px solid #fff;
  margin-right: 4px;
  margin-left: 4px;
  @media ${mediaQueries.tablet} {
    height: 20px;
    width: 20px;
    margin-left: 0px;
    margin-right: 0px;
    font-size: 14px;
  }
`;

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      icon: {
        82: {
          color: "#fffffff",
        },
      },
    },
  },
});
