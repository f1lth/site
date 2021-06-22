import { useState, useRef, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import Drawer from "@material-ui/core/Drawer";

import { useApollo } from "api/apollo";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { Category } from "api/queries/checkout.graphql";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { Logo } from "components/shared/svg/logo";
import { CartIcon } from "components/shared/svg/cart-icon";
import { UserIcon } from "components/shared/svg/user-icon";
import { HeartIcon } from "components/shared/svg/heart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { CloseButton } from "components/shared/svg/close-button";

import { NavProps } from "./index";
import { Cart } from "./cart/index";

const NAV_HEIGHT = "71px";

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

export function DesktopNav(props: NavProps): JSX.Element {
  const {
    darkBackground,
    page,
    selectSingleCategory = () => undefined,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const baseNavBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);

  const checkoutItemsCount = checkout?.items.length || 0;

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

  function openMenu() {
    setIsMenuOpen(true);
    console.log('open menu')
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleCategoryClick(category?: Category) {
    if (page === "menu") {
      selectSingleCategory(category);
      closeShopMenu();
    } else {
      router.push(`/menu?category=${category}`);
    }
  }

  function toggleShopMenu() {
    setIsSubmenuVisible(!isSubmenuVisible);
  }

  function closeShopMenu() {
    setIsSubmenuVisible(false);
  }

  function openCart() {
    setIsCartOpen(true);
    closeShopMenu();
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <>
      <Container darkBackground={darkBackground} ref={baseNavBarRef}>
        {isMenuOpen ? (
          <></>
        ) : (
          <MobileMenuIcon isDark={!darkBackground} onClick={openMenu} />
        )}
        <Link href="/"><LogoHeader>Flower</LogoHeader></Link>
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
      
      <StyledMenu
        open={isMenuOpen && !isCartOpen}
        anchorEl={baseNavBarRef.current}
        hideBackdrop
        elevation={0}
        transitionDuration={0}
        style={{ marginTop: NAV_HEIGHT }}
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
      {/* CART  */}
      <StyledMenu
        open={isCartOpen}
        anchorEl={baseNavBarRef.current}
        hideBackdrop
        elevation={0}
        transitionDuration={0}
      >
        <Cart onClose={closeCart} apolloClient={apolloClient} />
      </StyledMenu>
    </>
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

  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  background-color: ${(props) =>
    props.darkBackground ? "#322F46" : "#ffffff"};
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
const StyledMenuItem = styled(MenuItem)`
  height: 88px;
  font-size: 18px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;

  &:last-of-type {
    border-bottom: none;
  }
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
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0px 29px;
  height: 122px;

  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  background-color: ${(props) =>
    props.darkBackground ? "#322F46" : "#ffffff"};
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavLinkList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavLinkListItem = styled.div`
  margin-right: 40px;
  height: 100%;

  &:last-of-type {
    margin-right: 48px;
  }
`;

const NavLink = styled.div<{
  darkBackground?: boolean;
  isUnderlined?: boolean;
}>`
  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  user-select: none;
  border-bottom: ${(props) =>
    props.isUnderlined ? "3px solid #F4BD33" : "none"};

  // hacky. will revisit this
  & > svg {
    margin-left: 4px;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 100%;
`;

const LogoHeader = styled.div`
  font-weight: 400;
  font-size 24px;
  cursor: pointer;
}
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
  margin-right: 8px;
  display: flex;
  align-items: center;
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
  background-color: #f4bd33;
  font-size: 11px;
  font-weight: 700;
  top: -11px;
  right: -22px;
  color: #ffffff;
`;
