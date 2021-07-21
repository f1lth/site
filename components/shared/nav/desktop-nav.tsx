import { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import Drawer from "@material-ui/core/Drawer";

import { useApollo } from "api/apollo";
import { Category, Effects } from "api/queries/checkout.graphql";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { Logo } from "components/shared/svg/logo";
import { CartIcon } from "components/shared/svg/cart-icon";
import { UserIcon } from "components/shared/svg/user-icon";
import { HeartIcon } from "components/shared/svg/heart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { mediaQueries } from "styles/media-queries";
import { ellipse } from "ellipse.tsx";

import { NavProps } from "./index";
import { Cart } from "./cart/index";
import { displayNameForEffect } from "utils/enum-to-display-name/effect";

export function DesktopNav(props: NavProps): JSX.Element {
  const {
    page,
    selectSingleCategory = () => undefined,
    selectSingleEffect = () => undefined,
  } = props;

  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
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
    <>
      <Container>
        {isSubmenuVisible && <Backdrop onClick={closeShopMenu} />}
        <NavLink>
          <Header>CannaFlower</Header>
        </NavLink>
      </Container>
      <CartContainer>
        <NavLink>
          <CartIconContainer>
            <CartCount>
              {loading ? <LoadingSpinner size={8} /> : checkoutItemsCount}
            </CartCount>
            <CartIcon onClick={openCart} />
          </CartIconContainer>
          <Ellipse> order now </Ellipse>
        </NavLink>
      </CartContainer>
      <NavContainer color="#000000">
        <NavLinksContainer>
          <NavLinkList>
            <NavLinkListItem onClick={openStore}>
              <NavLink color="#000000" isUnderlined={page === "menu"}>
                Shop
                <Chevron
                  direction={
                    isSubmenuVisible
                      ? ChevronDirection.Up
                      : ChevronDirection.Down
                  }
                  color="#000000"
                />
              </NavLink>
            </NavLinkListItem>
            <NavLinkListItem>
              <NavLink color="#000000">About</NavLink>
            </NavLinkListItem>
            <NavLinkListItem>
              <NavLink color="#000000">Connect</NavLink>
            </NavLinkListItem>
          </NavLinkList>
        </NavLinksContainer>
        {/* SHOP MENU */}
        {isSubmenuVisible && (
          <StyledMenu>
            <SubmenuSection>
              <SubmenuItemBold>New Products</SubmenuItemBold>
              <SubmenuItemBold>Best Sellers</SubmenuItemBold>
              <SubmenuItemBold>Dispensary Specials</SubmenuItemBold>
              <SubmenuItemBold onClick={() => handleCategoryClick(undefined)}>
                Shop All ➡
              </SubmenuItemBold>
            </SubmenuSection>
            <Divider />
            <SubmenuSection>
              <SubmenuItemBold>Shop North Cannabis</SubmenuItemBold>
              {SUBMENU_CATEGORIES.map((category) => (
                <SubmenuItem
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {displayNameForCategory(category)}
                </SubmenuItem>
              ))}
            </SubmenuSection>
            <SubmenuSection>
              <SubmenuItemBold>Shop by Effect</SubmenuItemBold>
              {SUBMENU_EFFECTS.map((effect) => (
                <SubmenuItem
                  key={effect}
                  onClick={() => handleEffectClick(effect)}
                >
                  {displayNameForEffect(effect)}
                </SubmenuItem>
              ))}
            </SubmenuSection>
            <SubmenuSection>
              <SubmenuItemBold>North Gear</SubmenuItemBold>
              <SubmenuItem>Cannabis Accessories</SubmenuItem>
              <SubmenuItem>Clothing</SubmenuItem>
            </SubmenuSection>
          </StyledMenu>
        )}

        {/* CART */}
        <Drawer anchor="right" open={isCartVisible} onBackdropClick={closeCart}>
          <Cart onClose={closeCart} apolloClient={apolloClient} />
        </Drawer>
      </NavContainer>
    </>
  );
}

const Container = styled.div`
  z-index: 300;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  padding: 40px 0px 0px 10px;
`;

const CartContainer = styled.div`
  z-index: 300;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 10px;
  flex-direction: row;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #d9d6d2;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Header = styled.div`
  font-family: visuelt;
  font-size: 31px;
  font-style: normal;
  font-weight: 400;
  line-height: 58px;
  letter-spacing: 0em;
  color: #000000;
  margin-top: 40px;
`;

const SubmenuSection = styled.div`
  outline: none;
`;

const StyledMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  height: 363px;
  width: 100%;
  max-width: 1440px;
  background-color: #ffffff;

  display: flex;
  justify-content: space-between;
  padding: 25px 200px;
`;

const SubmenuItemBold = styled.div`
  font-weight: 500;
  margin-bottom: 24px;
  font-size: 14px;

  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
  &:hover {
    text-decoration: ${(props) => (props.onClick ? "underline" : "none")};
  }
`;

const SubmenuItem = styled.div`
  margin-bottom: 18px;

  // for items that aren't actually links yet
  font-size: 13px;
  color: rgba(31, 43, 73, 0.7);
  text-decoration: none;

  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
  &:hover {
    text-decoration: ${(props) => (props.onClick ? "underline" : "none")};
  }

  & > a {
    font-size: 13px;
    color: rgba(31, 43, 73, 0.7);
    text-decoration: none;
  }
`;

const NavContainer = styled.nav<{ darkBackground?: boolean }>`
  z-index: 3;
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  padding: 0px 30px;
  height: 135px;

  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  background-color: "rgba(52, 52, 52, 0.0)";
`;

const NavLinksContainer = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
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
  align-items: center;
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
  display: inline;
  align-items: center;

  z-index: 3;
`;

const Ellipse = styled.div`
  background-color: #AA97F6;
  border-radius: 50%;
  text-align: center;
  align-items: center;

  display: flex;
  color: white;
  font-size: 1.125em;
  font-weight: 400;
  z-index: 305;
  position: relative;
  width: 75px;
  height: 75px;
  
  margin-right: 40px;
  margin-left: 90px;
  margin-top: -59px;
}
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
