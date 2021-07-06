import { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import { Divider, Drawer } from "@material-ui/core";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { CloseButton } from "components/shared/svg/close-button";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { useApollo } from "api/apollo";
import { Category, Effects } from "api/queries/checkout.graphql";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { Logo } from "components/shared/svg/logo";
import { makeStyles } from "@material-ui/core/styles";

import { CartIcon } from "components/shared/svg/cart-icon";
import { UserIcon } from "components/shared/svg/user-icon";
import { HeartIcon } from "components/shared/svg/heart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { displayNameForEffect } from "utils/enum-to-display-name/effect";

import { mediaQueries } from "styles/media-queries";
import { ellipse } from "ellipse.tsx";

import { NavProps } from "./index";
import { Cart } from "./cart/index";

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

const FX_CATEGORIES = [
  Effects.Sleepy,
  Effects.Happy,
  Effects.Relaxed,
  Effects.Calm,
];

export function DesktopNav(props: NavProps): JSX.Element {
  const {
    page,
    darkBackground,
    selectSingleCategory = () => undefined,
    selectSingleEffect = () => undefined,
  } = props;

  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);

  const useStyles = makeStyles((theme) => ({
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: "lightblue",
      },
    },
  }));
  const classes = useStyles();

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

  function handleEffectClick(effect?: Effects) {
    if (page === "menu") {
      selectSingleEffect(effect);
      closeShopMenu();
    } else {
      router.push(`/menu?effects=${effect}`);
    }
  }

  function openStore() {
    router.push("/menu");
  }

  function openShopMenu() {
    setIsSubmenuVisible(true);
  }

  function delayCloseMenu() {
    setTimeout(function () {
      setIsMenuShown(false);
    }, 10000);
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

  return (
    <MuiThemeProvider theme={theme}>
      {isSubmenuVisible && <Backdrop onClick={closeShopMenu} />}
      <Container>
        {isSubmenuVisible ? (
          <MobileMenuIcon isDark={true} onClick={closeShopMenu} />
        ) : (
          <MobileMenuIcon isDark={false} onClick={openShopMenu} />
        )}
        <NavLink>
          <Link href="/">
            <Header>Flower</Header>
          </Link>
        </NavLink>
        <NavLink>
          <CartIconContainer>
            <CartCount>
              {loading ? <LoadingSpinner size={8} /> : checkoutItemsCount}
            </CartCount>
            <CartIcon onClick={openCart} />
          </CartIconContainer>
        </NavLink>

        {/* CART */}
        <Drawer anchor="right" open={isCartVisible} onBackdropClick={closeCart}>
          <Cart
            onClose={closeCart}
            apolloClient={apolloClient}
            classes={classes}
          />
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
              <Link href="/">
                <SubmenuItemBold>HOME</SubmenuItemBold>
              </Link>
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
            <Divider />
            {isMenuShown && (
              <>
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
              </>
            )}
          </StyledMenu>
        </Drawer>
      </Container>

      <Divider></Divider>
    </MuiThemeProvider>
  );
}

const Container = styled.div`
  flex-direction: row;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 30px 60px 20px 60px;
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

  // for items that aren't actually links yet
  font-size: 15px;
  color: white;
  text-decoration: none;

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

const NavContainer = styled.nav<{ darkBackground?: boolean }>`
  z-index: 3;
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  padding: 0px 30px;
  height: 35px;

  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  background-color "#ffffff";
`;

const NavLinksContainer = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  margin-top: -20px;

  align-items: center;
  height: 100%;
`;

const NavLinkList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavLinkListItem = styled.div`
  margin-right: 60px;
  margin-left: 60px;
  margin-top: -120px;
  height: 100%;

  &:last-of-type {
    margin-right: 48px;
  }
`;

const NavLink = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 100%;
`;

const NavIconContainer = styled.div`
  height: 100%;
  margin-right: 20px;
  display: flex;
  align-items: center;

  :last-of-type {
    margin-right: 0;
  }
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
  background-color: #aa97f6;
  font-size: 11px;
  font-weight: 700;
  top: -11px;
  right: -22px;
  color: #ffffff;
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
