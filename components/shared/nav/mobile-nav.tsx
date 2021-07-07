import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useApollo } from "api/apollo";
import { Logo } from "components/shared/svg/logo";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { CloseButton } from "components/shared/svg/close-button";
import { CartIcon } from "components/shared/svg/cart-icon";
import { Divider, Drawer } from "@material-ui/core";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import { NavProps } from "./index";
import { Cart } from "./cart";

const NAV_HEIGHT = "71px";

export function MobileNav(props: NavProps): JSX.Element {
  const { darkBackground, page } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const baseNavBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);

  const useStyles = makeStyles((theme) => ({
    menuPaper: {
      backgroundColor: "black",
    },
  }));
  const classes = useStyles();
  const checkoutItemsCount = checkout?.items.length || 0;

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogoClick() {
    router.push("/");
  }

  function handleShopClick() {
    if (page === "menu") {
      setIsMenuOpen(false);
    } else {
      router.push("/menu");
    }
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Container darkBackground={darkBackground} ref={baseNavBarRef}>
        {isMenuOpen ? (
          <MobileMenuIcon isDark={false} onClick={closeMenu} />
        ) : (
          <MobileMenuIcon isDark={false} onClick={openMenu} />
        )}
        <Link href="/">
          <LogoHeader>Flower</LogoHeader>
        </Link>
        <CartIconContainer>
          <CartCount>
            {loading ? (
              <LoadingSpinner size={8} color="#ffffff" />
            ) : (
              checkoutItemsCount
            )}
          </CartCount>
          <CartIcon onClick={openCart} />
        </CartIconContainer>
      </Container>
      {/* SHOP MENU */}
      <Drawer
        anchor="left"
        open={isMenuOpen && !isCartOpen}
        onBackdropClick={closeMenu}
      >
        <StyledMenu
          open={isMenuOpen && !isCartOpen}
          anchorEl={baseNavBarRef.current}
          hideBackdrop
          elevation={0}
          transitionDuration={0}
        >
          <StyledMenuItem>
            <CloseButton isDark={!darkBackground} onClick={closeMenu} />
          </StyledMenuItem>
          <StyledMenuItem>HOME</StyledMenuItem>
          <StyledMenuItem onClick={handleShopClick}>
            SHOP
            <Chevron
              direction={ChevronDirection.Down}
              color="#ffffff"
              height={16}
              width={16}
            />
          </StyledMenuItem>
          <StyledMenuItem>ABOUT</StyledMenuItem>
          <StyledMenuItem>CONTACT</StyledMenuItem>
        </StyledMenu>
      </Drawer>

      {/* CART  */}
      <Drawer anchor="right" open={isCartOpen} onBackdropClick={closeCart}>
        <Cart onClose={closeCart} apolloClient={apolloClient} />
      </Drawer>
    </MuiThemeProvider>
  );
}

const Container = styled.div<{ darkBackground?: boolean }>`
  z-index: 3;
  height: ${NAV_HEIGHT};
  width: 100%;
  padding: 0 25px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: "#ffffff";
`;

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 4000;
  top: 0;
  left: 0px;
  height: 100%;
  width: 100vw;
  background-color: #000000;
  justify-content: start;
  gap: 1px;
`;

const LogoHeader = styled.div`
  font-weight: 400;
  font-size 24px;
  color: black;
  cursor: pointer;
}
`;

const LoginAndCartSection = styled.div`
  color: #ffffff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 13px;
  padding: 0 25px;
`;

const StyledMenuItem = styled(MenuItem)`
  height: 88px;
  font-size: 18px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  color: #ffffff;

  &:last-of-type {
    border-bottom: none;
  }
`;

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "black",
      },
    },
  },
});

const CartIconContainer = styled.div`
  position: relative;
  margin-right: 8px;
`;

const CartCount = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 100%;
  background-color: #000;
  font-size: 11px;
  font-weight: 700;
  top: -11px;
  right: -22px;
  color: #ffffff;
`;
