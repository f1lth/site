import styled from "styled-components";
import Link from "next/link";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { mediaQueries } from "styles/media-queries";

export function HeroSection(): JSX.Element {
  return (
    <>
      <Container>
        <MainHero>
          <MainHeroContent>
            <DesktopOnly>
              <HeroHeader>Quality Cannabis</HeroHeader>
              <Subheader>Shop Premium Product</Subheader>
            </DesktopOnly>
            <MobileOnly>
              <HeroHeader> Quality Cannabis </HeroHeader>
              <Subheader>Shop Premium Product</Subheader>
            </MobileOnly>
            <Link href="/menu" passHref>
              <HeroShopCTA>Shop</HeroShopCTA>
            </Link>
          </MainHeroContent>
        </MainHero>
        <Shatter>
          <Holder>
            <MiniHeader>Shop / Categories / Edibles</MiniHeader>
            <Subheader color="#aa1230"> Shatter Chocolate </Subheader>
            <Link href="/menu" passHref>
              <ShopCTA>Shop</ShopCTA>
            </Link>
          </Holder>
        </Shatter>
        <Column>
          <TopRectangle>
            <Holder>
              <MiniHeader>Shop / Categories / Vaporizers</MiniHeader>
              <Subheader>Pax Era Pro</Subheader>
              <Link href="/menu" passHref>
                <ShopCTA>Shop</ShopCTA>
              </Link>
            </Holder>
          </TopRectangle>
          <BotRectangle>
            <Holder>
              <MiniHeader>Shop / Categories / Oils</MiniHeader>
              <Subheader>High THC Cannabis Oil</Subheader>
              <Link href="/menu" passHref>
                <ShopCTA>Shop</ShopCTA>
              </Link>
            </Holder>
          </BotRectangle>
        </Column>
      </Container>
      <Header>About the Company</Header>

      <BodyText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut.
      </BodyText>
    </>
  );
}

const Container = styled.div`
  display: grid;
  gap: 30px;
  margin-top: 35px;
  grid-template-rows: 560px 1024px;
  grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
  padding: 0 29px;

  @media ${mediaQueries.tablet} {
    grid-template-rows: 505px 314px;
    gap: 5px;
    padding: 0 25px 25px 25px;
  }
`;

const Column = styled.div`
  display: grid;
  grid-template-rows: minmax(auto, 50%) minmax(auto, 50%);
  grid-template-columns: 1fr;
  padding: 0 0 0 10px;
`;

const Holder = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  left: 50px;
  margin-top: 70px;

  @media ${mediaQueries.tablet} {
    left: 20px;
    margin-top: 25px;
  }
`;

const Shatter = styled.div`
  background: url("images/Shatter.png") no-repeat center top;
  background-size: cover;
  background-position: center;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  object-fit: cover;
  height: auto;
  width: auto;

  @media ${mediaQueries.tablet} {
    gap: 5px;
    padding: 0 0px 25px 0px;
  }
`;

const TopRectangle = styled.div`
  background: url("images/cart.png") no-repeat center top;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20px;

  @media ${mediaQueries.tablet} {
    margin-bottom: 10px;
  }
`;

const BotRectangle = styled.div`
  background: url("images/cart_oil.png") no-repeat center top;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  object-fit: contain;
  flex-direction: column;
  overflow: hidden;
  min-width: 167.5px;
  max-height: auto;
  min-height: auto;
  min-width: auto;
`;

const MainHero = styled.div`
  background: url("images/background.png") no-repeat center top;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 78px;
  padding-right: 60px;
  grid-row: 1 / 1;
  grid-column: 1 / 3;
  overflow: hidden;
  position: relative;
  object-fit: cover;

  @media ${mediaQueries.tablet} {
    padding: 12px 22px 52px;
    margin-bottom: 11px;
  }
`;

const MainHeroContent = styled.div`
  z-index: 2;
`;

const Subheader = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 3px;
  margin-top: 5px;
  @media ${mediaQueries.tablet} {
    font-size: 14px;
  }
`;

const BodyText = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  text-align: center;
  width: 60%;
  margin-right: auto;
  margin-left: auto;

  @media ${mediaQueries.tablet} {
    margin-top: 10px;
    font-size: 12px;
  }
`;

const MiniHeader = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;

  @media ${mediaQueries.tablet} {
    font-size: 8px;
    font-weight: 500;
  }
`;

const HeroHeader = styled.div`
  font-family: "inter";
  font-weight: 700;
  font-size: 69px;
  color: #ffffff;
  width: 575px;
  margin-bottom: 8px;

  @media ${mediaQueries.tablet} {
    margin-top: 280px;
    font-size: 32px;
    width: 275px;
  }
`;

const Header = styled.div`
  font-family: "inter";
  font-weight: 500;
  font-size: 69px;
  text-align: center;
  color: #000000;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;

  @media ${mediaQueries.tablet} {
    font-size: 30px;
  }
`;

const HeroShopCTA = styled.a`
  background-color: #000000;
  color: white;
  padding: 18px 63px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;

  @media ${mediaQueries.largePhone} {
    padding: 13px 8px;
  }
`;

const ShopCTA = styled.a`
  background-color: #000000;
  color: white;
  padding: 13px 52px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  width: 148px;
  height: 44px;

  @media ${mediaQueries.tablet} {
    padding: 5px 17px;
    width: 52px;
    height: 16px;
    font-size: 7px;
  }

  &:hover {
    background-color: #b55555 !important;
  }
`;
