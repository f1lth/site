import { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import { Drawer } from "@material-ui/core";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { useApollo } from "api/apollo";
import { Category, Effects } from "api/queries/checkout.graphql";
import { SearchIcon } from "components/shared/svg/search-icon";
import { CartIcon } from "components/shared/svg/cart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import { displayNameForCategory } from "utils/enum-to-display-name/category";

import { NavProps } from "./index";
import { Cart } from "./cart/index";
import { useQuery } from "@apollo/client";
import SEARCH from "api/queries/search";

import { search } from "components/shared/util.js";

const SUBMENU_CATEGORIES = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
];

const SUBMENU_FX = [
  Effects.Calm,
  Effects.ClearMind,
  Effects.Creative,
  Effects.Energetic,
  Effects.Focused,
  Effects.Happy,
  Effects.Inspired,
  Effects.Relaxed,
  Effects.Sleepy,
  Effects.Uplifted,
];

export function DesktopNav(props: NavProps): JSX.Element {
  const { page, selectSingleCategory = () => undefined } = props;

  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [query, setQuery] = useState("");

  const [isMenuShown, setIsMenuShown] = useState(false);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);
  const checkoutItemsCount = checkout?.items.length || 0;

  function handleLogoClick() {
    router.push("/");
  }

  function handleCategoryClick(category?: Category) {
    if (page === "menu") {
      selectSingleCategory(category);
      closeShopMenu();
    } else {
      router.push(`/menu?category=${category}`);
    }
  }

  function handleHomeClick() {
    setIsMenuShown(false);
    router.push("/");
  }

  function openShopMenu() {
    setIsSubmenuVisible(true);
  }

  function closeShopMenu() {
    setIsSubmenuVisible(false);
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

  return (
    <MuiThemeProvider theme={theme}>
      {isSubmenuVisible && <Backdrop onClick={closeShopMenu} />}
      <Container>
        {isSubmenuVisible ? (
          <MobileMenuIcon isDark={true} onClick={closeShopMenu} />
        ) : (
          <MobileMenuIcon isDark={false} onClick={openShopMenu} />
        )}
        <Header onClick={handleLogoClick}>Flower</Header>
        <NavLink>
          {isSearchbarVisible ? (
            <NavLink>
              <FormControl onMouseLeave={() => closeSearch()}>
                <InputLabel htmlFor="input-with-icon-adornment">
                  Search for a product
                </InputLabel>
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
                />
              </FormControl>
            </NavLink>
          ) : (
            <NavLink onMouseEnter={() => openSearch()}>
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

        {/* CART */}
        <Drawer anchor="right" open={isCartVisible} onBackdropClick={closeCart}>
          <Cart onClose={closeCart} apolloClient={apolloClient} />
        </Drawer>
        <Drawer
          anchor="left"
          open={isSubmenuVisible}
          onBackdropClick={closeShopMenu}
        >
          <StyledMenu>
            <MobileMenuIcon isDark={true} onClick={closeShopMenu} />
            <UtilSection>
              <SocialItem>social 1</SocialItem>
              <SocialItem>social 2</SocialItem>
              <SocialItem>social 3</SocialItem>
            </UtilSection>
            <SubmenuSection>
              <SubmenuItemBold onClick={() => handleHomeClick()}>
                HOME
              </SubmenuItemBold>
              <Link href="/menu">
                <SubmenuItemBold onMouseEnter={() => setIsMenuShown(true)}>
                  SHOP
                </SubmenuItemBold>
              </Link>
              <Link href="/about">
                <SubmenuItemBold>ABOUT</SubmenuItemBold>
              </Link>
              <Link href="/contact">
                <SubmenuItemBold>CONTACT</SubmenuItemBold>
              </Link>
            </SubmenuSection>

            {isMenuShown && (
              <Menu>
                <SubmenuSection>
                  <SubmenuSection></SubmenuSection>
                  <SubmenuItem>New</SubmenuItem>
                  <SubmenuItem>Featured</SubmenuItem>
                  <SubmenuItem>Sale</SubmenuItem>
                </SubmenuSection>
                <SubmenuSection>
                  <SubmenuSection></SubmenuSection>
                  {SUBMENU_CATEGORIES.map((category) => (
                    <SubmenuItem
                      onMouseEnter={() => setIsMenuShown(true)}
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {displayNameForCategory(category)}
                    </SubmenuItem>
                  ))}
                </SubmenuSection>
                <SubmenuSection>
                  <SubmenuSection></SubmenuSection>
                  <SubmenuItem>Apparel</SubmenuItem>
                  <SubmenuItem>Accessories</SubmenuItem>
                  <SubmenuItem>See all</SubmenuItem>
                </SubmenuSection>
              </Menu>
            )}
          </StyledMenu>
        </Drawer>
      </Container>
      <Divider1 />
    </MuiThemeProvider>
  );
}

const Container = styled.div`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 30px 60px 20px 60px;
  align-items: center;
`;

const Divider1 = styled.div`
  background-color: rgba(1, 1, 1, 0.1);
  width: 100%;
  height: 1px;
`;
const Menu = styled.div`
  flex-direction: row;
  width: 300px;
  margin-left: -80px;
  display: flex;
  margin-bottom: 10px;
  padding: 0px 1px 20px 00px;
  gap: 60px;
  justify-content: space-between;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-family: inter;
  font-size: 31px;
  margin-top: -20px;
  font-style: normal;
  font-weight: 400;
  line-height: 58px;
  letter-spacing: 0em;
  text-align: center;

  color: #000000;
  z-index: 30;
`;

const UtilSection = styled.div`
  position: absolute;
  bottom: 10px;
  outline: none;
`;

const SubmenuSection = styled.div`
  margin-top: 120px;
  outline: none;
`;

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 4000;
  top: 0;
  left: 0px;
  height: 100%;
  width: 100%;
  max-width: 1440px;
  background-color: #000000;
  justify-content: space-between;
  gap: 120px;
  padding: 25px 180px 25px 50px;
`;

const SubmenuItemBold = styled.div`
  font-weight: 500;
  margin-bottom: 24px;
  font-size: 48px;
  color: white;
  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
  &:hover {
    text-decoration: ${(props) => (props.onClick ? "underline" : "none")};
  }
`;

const SubmenuItem = styled.div`
  margin-bottom: 18px;
  margin-top: 10px;
  // for items that aren't actually links yet
  font-size: 15px;
  color: white;
  text-decoration: none;
  margin-right: 10px;
  margin-left: 10px;

  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
  &:hover {
    text-decoration: ${(props) => (props.onClick ? "underline" : "none")};
  }

  & > a {
    font-size: 13px;
    text-decoration: none;
  }
`;
const SocialItem = styled.div`
  margin-bottom: 75px;
  // for items that aren't actually links yet
  font-size: 15px;
  color: white;
  text-decoration: none;
`;

const NavLink = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center; /* aligns on vertical for column */
  align-items: center;
`;

const CartIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 3;
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
  background-color: #000000;
  font-size: 11px;
  color: white;
  font-weight: 700;
  top: -11px;
  right: -22px;
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
