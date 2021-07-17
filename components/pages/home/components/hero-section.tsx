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
              <ShopCTA>Shop</ShopCTA>
            </Link>
          </MainHeroContent>
        </MainHero>
        <Shatter>
          <Holder>
            <MiniHeader>Shop / Categories / Edibles</MiniHeader>
            <Subheader color="#aa1230"> Shatter Chocolate </Subheader>
            <Link href="menu?category=EDIBLES" passHref>
              <ShopCTA>Shop</ShopCTA>
            </Link>
          </Holder>
        </Shatter>
        <Column>
          <TopRectangle>
            <Holder>
              <MiniHeader>Shop / Categories / Vaporizers</MiniHeader>
              <Subheader>Pax Era Pro</Subheader>
              <Link href="menu?category=VAPORIZERS" passHref>
                <ShopCTA>Shop</ShopCTA>
              </Link>
            </Holder>
          </TopRectangle>
          <BotRectangle>
            <Holder>
              <MiniHeader>Shop / Categories / Concentrates</MiniHeader>
              <Subheader>High THC Cannabis Oil</Subheader>
              <Link href="/menu?category=CONCENTRATES" passHref>
                <ShopCTA>Shop</ShopCTA>
              </Link>
            </Holder>
          </BotRectangle>
        </Column>
      </Container>
      <AboutContainer>
        <Header>About the Company</Header>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </BodyText>
        <BodyText>
          <Link href="/menu/about" passHref>
            <ShopCTA style={{ width: "215px" }}>Learn More</ShopCTA>
          </Link>
        </BodyText>
      </AboutContainer>
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
  gap: 22px;
  grid-template-columns: 1fr;
  padding: 0 0 0 10px;
  @media ${mediaQueries.tablet} {
    gap: 6px;
  }
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
  background: url("images/shatter.png") no-repeat center top;
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
  padding-left: 48px;
  padding-top: 200px;
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
  font-family: "inter";
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
  margin-top: 5px;
  @media ${mediaQueries.tablet} {
    width: 120px;
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

const BodyText = styled.div`
  font-weight: 450;
  font-size: 19px;
  color: #000000;
  font-family: "inter";
  text-align: center;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 30px;

  @media ${mediaQueries.tablet} {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 12px;
  }
`;

const MiniHeader = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 15px;
  color: #ffffff;

  @media ${mediaQueries.tablet} {
    font-size: 8px;
    width: 120px;
    margin-bottom: 5px;
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
  width: 100%;
  font-size: 54px;
  text-align: center;
  color: #000000;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;

  @media ${mediaQueries.tablet} {
    font-size: 30px;
    margin-top: 10px;
  }
`;

const ShopCTA = styled.a`
  background-color: #000000;
  color: white;
  padding: 13px 52px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  font-size: 17px;
  font-weight: 500;
  width: 148px;
  height: 44px;

  @media ${mediaQueries.tablet} {
    padding: 8px 17px;
    width: 82px;
    margin-top: 3px;
    height: 26px;
    font-size: 9px;
  }

  &:hover {
    background-color: #04a09a !important;
  }
`;

const AboutContainer = styled.div`
  display: grid;
  width: 100%;
  height: 360px;
  align-items: center;

  @media ${mediaQueries.tablet} {
    height: 200px;
  }
`;
