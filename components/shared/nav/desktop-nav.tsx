///////////////////////////
/*     DESKTOP-NAV       */
///////////////////////////
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useApollo } from "api/apollo";
import { Category } from "api/queries/checkout.graphql";
import { NavProps } from "./index";
import { Cart } from "./cart/index";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { CloseButton } from "../svg/close-button";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { SearchIcon } from "components/shared/svg/search-icon";
import { CartIcon } from "components/shared/svg/cart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { Drawer } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

// CATEGORY ENUM
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
  // Props
  const { page, selectSingleCategory = () => undefined } = props;
  // State
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isMenuShown, setIsMenuShown] = useState(false);
  // Util
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);
  const checkoutItemsCount = checkout?.items.length || 0;
  // Handlers
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

  function handleMenuClick() {
    router.push("/menu");
  }

  function handleAboutClick() {
    router.push("/about");
  }

  function handleHomeClick() {
    setIsContactVisible(false);
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

  function openShop() {
    setIsContactVisible(false);
    setIsMenuShown(true);
  }

  function openContact() {
    setIsMenuShown(false);
    setIsContactVisible(true);
  }

  function closeActive() {
    setIsContactVisible(false);
    setIsMenuShown(false);
  }

  function openSearch() {
    setIsSearchbarVisible(true);
  }

  function closeSearch() {
    router.push("/menu?");
    setIsSearchbarVisible(false);
  }

  function goSearch(query: String) {
    const path = "/menu?q=" + query;
    router.push(path);
  }
  // UI
  return (
    <MuiThemeProvider theme={theme}>
      {isSubmenuVisible && <Backdrop onClick={closeShopMenu} />}
      <Container>
        <NavLink>
          {isSubmenuVisible ? (
            <MobileMenuIcon isDark={true} onClick={closeShopMenu} />
          ) : (
            <MobileMenuIcon isDark={false} onClick={openShopMenu} />
          )}
        </NavLink>
        <NavLink>
          {!isSearchbarVisible ? (
            <Header onClick={handleLogoClick}> Brand | Logo </Header>
          ) : (
            <SearchHeader
              onClick={handleLogoClick}
              style={{ marginRight: "-320px" }}
            >
              search for a product :{" "}
            </SearchHeader>
          )}
        </NavLink>
        <NavLink>
          {/* Searchbar Logic */}
          {isSearchbarVisible ? (
            <NavLink>
              <MuiThemeProvider theme={theme}>
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
                          width={36}
                          height={36}
                          onClick={() => closeSearch()}
                        />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </MuiThemeProvider>
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
            <SubmenuItem>
              <MobileMenuIcon isDark={true} onClick={closeShopMenu} />
            </SubmenuItem>
            <UtilSection>
              <SocialItem>social 1</SocialItem>
              <SocialItem>social 2</SocialItem>
              <SocialItem>social 3</SocialItem>
            </UtilSection>
            <SubmenuSection>
              <SubmenuItemBold
                onMouseEnter={() => closeActive()}
                onClick={() => handleHomeClick()}
              >
                HOME
              </SubmenuItemBold>
              <SubmenuItemBold
                onMouseEnter={() => openShop()}
                onClick={() => handleMenuClick()}
              >
                SHOP
              </SubmenuItemBold>
              <SubmenuItemBold
                onMouseEnter={() => closeActive()}
                onClick={() => handleAboutClick()}
              >
                ABOUT
              </SubmenuItemBold>
              <SubmenuItemBold onMouseEnter={() => openContact()}>
                CONTACT
              </SubmenuItemBold>
            </SubmenuSection>
            {/* MENU */}
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
                      onMouseEnter={() => openShop()}
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
            {isContactVisible && (
              <Menu>
                <SubmenuSection>
                  <SubmenuSection></SubmenuSection>
                  <SubmenuItem></SubmenuItem>
                  <SubmenuSection></SubmenuSection>
                  <SubmenuItem>Telephone</SubmenuItem>
                  <SubmenuItem>Email</SubmenuItem>
                  <SubmenuItem>Address</SubmenuItem>
                </SubmenuSection>
                <SubmenuSection>
                  <SubmenuSection></SubmenuSection>
                  <SubmenuItem></SubmenuItem>
                  <SubmenuSection></SubmenuSection>
                  <SubmenuItem>416-123-9876</SubmenuItem>
                  <SubmenuItem>store@flower.com</SubmenuItem>
                  <SubmenuItem>1 Bloor St. </SubmenuItem>
                </SubmenuSection>
              </Menu>
            )}
          </StyledMenu>
        </Drawer>
      </Container>
      <Divider />
    </MuiThemeProvider>
  );
}

const Container = styled.div`
  justify-content: space-between;
  flex-direction: row;
  height: 80px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 30px 60px 20px 60px;
  align-items: center;
`;

const Divider = styled.div`
  background-color: rgba(1, 1, 1, 0.1);
  width: 100%;
  height: 1.01px; //hacky but divider.
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
  font-size: 31px;
  font-style: normal;
  font-weight: 400;
  line-height: 58px;
  letter-spacing: 0em;
  text-align: center;
  color: #000000;
  z-index: 30;
`;

const SearchHeader = styled.div`
  font-size: 18px;
  font-style: normal;
  margin-right: auto;
  margin-left: 60px;
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
  margin-top: 110px;
  display: inline-block;
  outline: none;
  min-width: 110px;
`;

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 4000;
  top: 0;
  left: 0px;
  height: 100%;
  width: 100vw;
  max-width: 1440px;
  background-color: #000000;
  justify-content: start;
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
