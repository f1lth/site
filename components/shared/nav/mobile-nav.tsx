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
import { SearchIcon } from "components/shared/svg/search-icon";
import { CartIcon } from "components/shared/svg/cart-icon";
import { Divider, Drawer } from "@material-ui/core";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import { NavProps } from "./index";
import { Cart } from "./cart";

const NAV_HEIGHT = "71px";

export function MobileNav(props: NavProps): JSX.Element {
  // Props
  const { darkBackground, page } = props;
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [query, setQuery] = useState("");
  // Util
  const baseNavBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);
  const checkoutItemsCount = checkout?.items.length || 0;
  // Handlers
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
    setIsCartVisible(true);
  }

  function closeCart() {
    setIsCartVisible(false);
  }

  function openSearch() {
    setIsSearchbarVisible(true);
  }

  function closeSearch() {
    setIsSearchbarVisible(false);
  }

  function goSearch(query: String) {
    const path = "/menu?q=" + query;
    router.push(path);
  }
  // UI
  return (
    <MuiThemeProvider theme={theme}>
      <Container darkBackground={darkBackground} ref={baseNavBarRef}>
        {isMenuOpen ? (
          <MobileMenuIcon isDark={false} onClick={closeMenu} />
        ) : (
          <MobileMenuIcon isDark={false} onClick={openMenu} />
        )}
        <NavLink>
          {!isSearchbarVisible ? (
            <LogoHeader onClick={handleLogoClick}>Flower</LogoHeader>
          ) : (
            <LogoHeader></LogoHeader>
          )}
        </NavLink>
        <NavLink>
          {isSearchbarVisible ? (
            <NavLink>
              <FormControl>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon onClick={() => goSearch(query)} />
                    </InputAdornment>
                  }
                  value={query}
                  onChange={(q) => setQuery(q.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      goSearch(query);
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <CloseButton onClick={() => closeSearch()} />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </NavLink>
          ) : (
            <NavLink onClick={() => openSearch()}>
              <SearchIcon />
            </NavLink>
          )}
          <CartIconContainer>
            <CartCount>
              {loading ? <LoadingSpinner size={8} /> : checkoutItemsCount}
            </CartCount>
            <CartIcon onClick={openCart} />
          </CartIconContainer>
        </NavLink>
      </Container>
      {/* SHOP MENU */}
      <Drawer
        anchor="left"
        open={isMenuOpen && !isCartVisible}
        onBackdropClick={closeMenu}
      >
        <StyledMenu
          open={isMenuOpen && !isCartVisible}
          anchorEl={baseNavBarRef.current}
          hideBackdrop
          elevation={0}
          transitionDuration={0}
        >
          <StyledMenuItem>
            <MobileMenuIcon isDark={true} onClick={closeMenu} />
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
      <Drawer anchor="right" open={isCartVisible} onBackdropClick={closeCart}>
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

const NavLink = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: -10px;
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
  margin-left: 8px;
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
