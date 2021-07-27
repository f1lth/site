///////////////////////////
/*      MOBILE-NAV       */
///////////////////////////
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { useApollo } from "api/apollo";
import { NavProps } from "./index";
import { Cart } from "./cart";
import { Category } from "api/queries/checkout.graphql";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { CheckoutContext } from "components/shared/checkout-context";
import { CloseButton } from "components/shared/svg/close-button";
import { SearchIcon } from "components/shared/svg/search-icon";
import { CartIcon } from "components/shared/svg/cart-icon";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

const NAV_HEIGHT = "71px";
const SUBMENU_CATEGORIES = [
  Category.Flower,
  Category.Concentrates,
  Category.Edibles,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
];

export function MobileNav(props: NavProps): JSX.Element {
  // Props
  const { darkBackground, page } = props;
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
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

  function handleCategoryClick(category?: Category) {
    if (page === "menu") {
      closeShopMenu();
    } else {
      router.push(`/menu?category=${category}`);
    }
  }

  function handleLogoClick() {
    router.push("/");
  }

  function openShopMenu() {
    setIsMenuOpen(true);
  }

  function closeShopMenu() {
    setIsMenuOpen(false);
  }

  function toggleCategory() {
    setIsCategoryOpen(!isCategoryOpen);
  }

  function openCart() {
    setIsCartVisible(true);
  }

  function handleAboutClick() {
    router.push("/about");
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

  function goSearch(query: string) {
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
            <LogoHeader onClick={handleLogoClick}>Brand | Logo</LogoHeader>
          ) : (
            <LogoHeader />
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
                      <CloseButton
                        color={"#000"}
                        width={34}
                        height={34}
                        onClick={() => closeSearch()}
                      />
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
          <StyledMenuItem
            style={{ marginRight: "6px" }}
            onClick={toggleCategory}
          >
            SHOP
            <Chevron
              direction={
                isCategoryOpen ? ChevronDirection.Up : ChevronDirection.Down
              }
              color="#ffffff"
              height={12}
              width={12}
            />
          </StyledMenuItem>
          {isCategoryOpen && (
            <Menu>
              {SUBMENU_CATEGORIES.map((category) => (
                <StyledMenuItem
                  onMouseEnter={() => openShopMenu()}
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  style={{ fontSize: "16px" }}
                >
                  {displayNameForCategory(category)}
                </StyledMenuItem>
              ))}
            </Menu>
          )}
          <StyledMenuItem onClick={() => handleAboutClick()}>
            {" "}
            ABOUT
          </StyledMenuItem>
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

const Menu = styled.div`
  flex-direction: column;
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: start;
  padding: 0px 30px 0 30px;
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
