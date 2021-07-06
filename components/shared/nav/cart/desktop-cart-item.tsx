import styled, { withTheme } from "styled-components";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import { CheckoutItemFragment } from "api/fragments/checkout-item.graphql";
import { CloseButton } from "components/shared/svg/close-button";
import { formatPrice } from "utils/number-format";

interface DesktopCartItemProps {
  item: CheckoutItemFragment;
  handleCheckoutQuantityUpdate: (
    item: CheckoutItemFragment,
    newQuantity: number
  ) => void;
  handleRemoveItemFromCheckout: (item: CheckoutItemFragment) => void;
  costOfCheckoutItem: (item: CheckoutItemFragment) => number;
}

export function DesktopCartItem(props: DesktopCartItemProps): JSX.Element {
  const {
    item,
    handleCheckoutQuantityUpdate,
    handleRemoveItemFromCheckout,
    costOfCheckoutItem,
  } = props;

  function incrementProduct() {
    console.log("icr");
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

  const useStyles = makeStyles((theme) => ({
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: "lightblue",
      },
    },
  }));
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
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
          <Circle onClick={() => incrementProduct()}>+</Circle>
          {item.quantity}
          <Circle onClick={() => decrementProduct()}>-</Circle>
        </Center>
        <RightSide>
          <Price>{formatPrice(costOfCheckoutItem(item))}</Price>
          <CloseButton
            height={20}
            width={20}
            onClick={() => handleRemoveItemFromCheckout(item)}
            isDark
          />
        </RightSide>
      </CheckoutItem>
    </MuiThemeProvider>
  );
}

const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  color: white;
  align-items: center;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightSide = styled.div`
  display: flex;
  color: white;
  align-items: center;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  max-width: 190px;
`;

const Price = styled.div`
  font-size: 14px;
  width: 77px;
  color: white;
  text-align: center;
`;

const CheckoutItemImageContainer = styled.div`
  height: 70px;
  width: 70px;
  border: 1px solid rgba(160, 153, 142, 0.4);
  background-color: rgba(248, 245, 240, 0.4);
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

// TODO: make a proper shared select component. currently the dropdown does not match specs.
const QuantitySelect = styled(Select)`
  width: 58px;
  height: 39px;
  border-radius: 0px !important;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 15px;
  }
`;

const Circle = styled.div`
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: "flex";
  height: 43.94px;
  width: 43.94px;
  font-size: 21px;
  color: #fff;
  fill: "none";
  cursor: pointer;
  border: 1px solid #fff;
  padding-top: 10px;
`;

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        color: "#ffffff",
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: "none",
        borderTop: "none",
        padding: "0px 0px 0px 0px",
        "&:before": {
          display: "none",
        },
      },
    },
    MuiSelect: {
      icon: {
        82: {
          color: "#fffffff",
        },
      },
    },
  },
});
