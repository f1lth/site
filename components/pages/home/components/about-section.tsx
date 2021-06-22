import styled from "styled-components";
import Link from "next/link";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { mediaQueries } from "styles/media-queries";

export function HeroSection(): JSX.Element {
  return (
    <Container>
      <MainHero>
        <MainHeroContent>
          <DesktopOnly>
            <Header>About the company </Header>
          </DesktopOnly>
          <MobileOnly>
          <Header>About the company </Header>
          </MobileOnly>
          
          <Link href="/menu" passHref>
            <ShopCTA>Learn more</ShopCTA>
          </Link>
        </MainHeroContent>
        </MainHero>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 11px;
  grid-template-rows: 560px 1024px;
  grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
  padding: 0 29px;
  min-height: 0; 
  min-width: 0; 

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
  min-height: 0;
  min-width: 0;
  padding: 0 0 0 10px;

`;

const Shatter = styled.div`
  background: url("images/Shatter.png") no-repeat center top;
  background-size: 750px auto;
  background-position: center;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  object-fit: cover;
  min-height: 0;
  min-width: 0;
  height: auto;
  width: auto;

  @media ${mediaQueries.tablet} {

    gap: 5px;
    padding: 0 25px 25px 25px;
  }

`;

const EdiblesSubheader = styled.div`
  // this is the only instance of Lato font i see in the specs. maybe we can just keep it poppins
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #f0c7bb;
  margin-bottom: 12px;
`;

const EdiblesHeader = styled.div`
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 35px;
  color: #ffffff;
  width: 450px;

  @media ${mediaQueries.tablet} {
    font-size: 32px;
  }
`;

const TopRectangle = styled.div`
  background: url("images/cart.png") no-repeat center top;
  background-size: 750px 100%;
  background-position: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  min-width: 167.5px;
  max-height: auto;
  min-height: auto;
  min-width: auto;

  margin-bottom: 20px;
  @media ${mediaQueries.tablet} {
    margin-bottom: 10px;
  }

`;

const BotRectangle = styled.div`
  background: url("images/cart_oil.png") no-repeat center top;
  background-size: 800px 600px;
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

const OnlineOrdersImage = styled.img`
  height: 30px;
  display: inline-block;
  margin-bottom: 33px;
`;

const OnlineOrdersSubheader = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #f0c7bb;
`;

const OnlineOrdersHeader = styled.div`
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 37px;

  @media ${mediaQueries.tablet} {
    font-size: 32px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 30px;
    width: 300px;
  }
`;

const OnlineOrdersCTA = styled.a`
  border: 1px solid #e7b9ab;
  color: #e7b9ab;
  padding: 15px 32px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    color: #ffffff;
  }
`;

const MainHero = styled.div`
  background: url("images/background.png") no-repeat center top;
  background-size: 1403px 558px;
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
  min-height: auto;
  min-width: auto;


  @media ${mediaQueries.tablet} {
    padding: 12px 22px 52px;
    margin-bottom: 11px;
  }
`;

const MainHeroContent = styled.div`
  z-index: 2;
`;

const Subheader = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 11px;
`;

const Header = styled.div`
  font-family: "Playfair Display";
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

const BudImg = styled.img`
  width: 640px;
  position: absolute;
  bottom: 0;
  right: 40px;

  @media ${mediaQueries.tablet} {
    right: 20px;
    width: 400px;
  }

  @media ${mediaQueries.largePhone} {
    right: -80px;
    width: 300px;
  }
`;

const ShopCTA = styled.a`
  background-color: #000000;
  color: white;
  padding: 18px 63px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;

  @media ${mediaQueries.largePhone} {
    padding: 13px 38px;
  }

  &:hover {
    background-color: #b55555 !important;
  }
`;
