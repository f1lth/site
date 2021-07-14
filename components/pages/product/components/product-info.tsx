import { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import { mediaQueries } from "styles/media-queries";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { MenuProductFragment } from "api/fragments/menu-product.graphql";
import { deriveDisplayPrices } from "utils/product";
import { useAddItemToCheckoutMutation } from "api/mutations/add-item-to-checkout.graphql";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { CheckoutContext } from "components/shared/checkout-context";

interface ProductInfoProps {
  product: MenuProductFragment;
}

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8];

function ProductInfo(props: ProductInfoProps): JSX.Element {
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

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: "rgba(110, 240, 210, .03)",
      borderBottom: "0px solid rgba(0, 0, 0, .125)",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  const classes = useStyles();

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

  async function handleBuyClick() {
    console.log("checking out with current cart state!");
    await addItemToCheckoutMutation({
      variables: {
        checkoutId: checkout?.id || "",
        productId: product.id,
        quantity: selectedQuantity,
        option: selectedVariant,
      },
    });
  }

  function incrementProduct() {
    if (selectedQuantity < 9) {
      setSelectedQuantity((selectedQuantity + 1) as number);
    }
  }

  function decrementProduct() {
    if (selectedQuantity > 1) {
      setSelectedQuantity((selectedQuantity - 1) as number);
    }
  }

  return (
    <Container>
      <Name>{product.name}</Name>
      <Price>{deriveDisplayPrices(product).rec}</Price>
      <InfoContainer>
        <Circle>
          THC {"\n"}
          {product.potencyThc?.formatted}
        </Circle>
        <Circle>
          CBD {"\n"}
          {product.potencyCbd?.formatted}
        </Circle>
        <Circle>
          {product.strainType == "NOT_APPLICABLE" ? "NA" : product.strainType}
        </Circle>
      </InfoContainer>
      <QuantitySelect>
        <QuantityText>QTY:</QuantityText>
        <Circle
          style={{ height: "47px", width: "47px", cursor: "pointer" }}
          onClick={() => incrementProduct()}
        >
          +
        </Circle>
        <QuantityText>{selectedQuantity}</QuantityText>
        <Circle
          style={{ height: "47px", width: "47px", cursor: "pointer" }}
          onClick={() => decrementProduct()}
        >
          -
        </Circle>
      </QuantitySelect>
      <MuiThemeProvider theme={theme}>
        <AddToCartButton
          variant="text"
          size="medium"
          onClick={handleAddToCartClick}
        >
          {addingToCart ? (
            <StyledLoadingSpinner size={32} color="#000" />
          ) : (
            "Add to Cart"
          )}
        </AddToCartButton>
      </MuiThemeProvider>
      <BuyButton
        variant="outlined"
        size="medium"
        //TODO handle checkout instantly
        onClick={handleBuyClick}
      >
        Buy now
      </BuyButton>
      <MuiThemeProvider theme={theme}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {product.description.replace(/<[^>]+>/g, "")}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Effects</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DesktopOnly>
              <InfoContainer>
                {(product?.effects || []).map((e) => (
                  <Circle
                    style={{
                      background: "#000",
                      color: "#fff",
                      fontSize: "75%",
                    }}
                    key={e}
                  >
                    {e}
                  </Circle>
                ))}
              </InfoContainer>
            </DesktopOnly>
            <MobileOnly>
              <InfoContainer>
                {(product?.effects || []).map((e) => (
                  <Circle
                    style={{
                      background: "#000",
                      color: "#fff",
                      fontSize: "55%",
                    }}
                    key={e}
                  >
                    {e}
                  </Circle>
                ))}
              </InfoContainer>
            </MobileOnly>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Terpenes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </MuiThemeProvider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Price = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 64px;
  letter-spacing: 0.05em;
  margin-bottom: 1em;
`;

const Name = styled.div`
  font-family: "inter";
  font-size: 33px;
  color: #000000;
  line-height: 32px;
  letter-spacing: 0.05em;
  @media ${mediaQueries.tablet} {
    font-size: 27px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  min-width: 600px;
  flex-direction: row;
  height: auto;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  justify-content: space-between;
  @media ${mediaQueries.tablet} {
    min-width: 300px;
  }
`;

const Circle = styled.div`
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 85px;
  width: 85px;
  font-size: 135%;
  color: #000;
  fill: "none";
  border: 1px solid #000000;
  @media ${mediaQueries.tablet} {
    height: 55px;
    width: 55px;
    font-size: 85%;
  }
`;

const QuantitySelect = styled.div`
  width: 230px;
  display: flex;
  user-select: none;
  margin-top: 35px;
  align-items: center;
  margin-bottom: 35px;
  flex-direction: row;
  justify-content: space-between;

  @media ${mediaQueries.tablet} {
    width: 206px;
  }
`;

const AddToCartButton = styled(Button)`
  width: 100%;
  font-size: 18px;
  font-family: "inter";
  border: 2px solid #000;
  margin: 0.5em auto 0.5em 0em;
  background-color: black;
  color: white;
  &:hover {
    background-color: black;
    color: black;
  }
`;

const BuyButton = styled(Button)`
  width: 100%;
  font-size: 18px;
  border: 2px solid #000;
  text-transform: uppercase;
  margin: 0.5em auto 0.5em 0em;
  color: white;
`;

const theme = createMuiTheme({
  overrides: {
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
    MuiAccordionSummary: {
      root: {
        padding: "0px 0px 0px 0px",
      },
    },
    MuiButton: {
      label: {
        color: "white",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
      },
    },
  },
});

const QuantityText = styled.div`
  font-size: 20px;
`;

const StyledLoadingSpinner = styled(LoadingSpinner)`
  margin-right: 34px;
  margin-left: 34px;
`;

export default ProductInfo;
