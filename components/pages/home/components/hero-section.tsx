import styled from "styled-components";
import Link from "next/link";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { mediaQueries } from "styles/media-queries";

export function HeroSection(): JSX.Element {
  return (
    <Content>
      <MainHero>
        <MainHeroContent>
          <DesktopOnly>
            <Link href="/menu">
              <HeroHeader>shop cannabis</HeroHeader>
            </Link>
            <Link href="/new">
              <HeroHeader>new products</HeroHeader>
            </Link>
          </DesktopOnly>
          <MobileOnly>
            <Link href="/menu">
              <HeroHeader>shop canna bis</HeroHeader>
            </Link>
          </MobileOnly>
        </MainHeroContent>
      </MainHero>
      <DesktopOnly>
        <Container>
          <Header>
            {" "}
            THE WORLD IS READY FOR SOMETHING DIFFERENT - A NEW TYPE OF CANNABIS
            FOR OPEN MINDED PEOPLE.
          </Header>
          <Card>
            <LeftHeader>
              OUR COMPANY GOAL IS TO CREATE FUN, HIGH QUALITY CANNABIS PRODUCTS
              FOR EVERYONE.
              <Link href="/about" passHref>
                <MiniHeader>OUR STORY</MiniHeader>
              </Link>
            </LeftHeader>
            <Image src="images/bud.png" />
          </Card>
          <Card>
            <Image src="images/pipe.png"></Image>
            <RightHeader>
              CRYSTAL PIPE
              <Subheader>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
                <Link href="/menu">
                  <TopButton>Order now</TopButton>
                </Link>
              </Subheader>
            </RightHeader>
          </Card>
          <Card>
            <LeftHeader>
              RAINBOW FISH GUMMIES
              <Subheader>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
                <Link href="/menu">
                  <BottomButton>Order now</BottomButton>
                </Link>
              </Subheader>
            </LeftHeader>
            <Image src="images/fish.png" />
          </Card>
        </Container>
      </DesktopOnly>
      <MobileOnly>
        <Content>
          <Header>
            THE WORLD IS READY FOR SOMETHING DIFFERENT - A NEW TYPE OF CANNABIS
            FOR OPEN MINDED PEOPLE.
          </Header>
          <Image src="images/bud.png" />
          <LeftHeader>
            OUR COMPANY GOAL IS TO CREATE FUN, HIGH QUALITY CANNABIS PRODUCTS
            FOR EVERYONE.
            <Link href="/about" passHref>
              <MiniHeader>OUR STORY</MiniHeader>
            </Link>
          </LeftHeader>
          <Divider />
          <MobilePipe src="images/pipe.png"></MobilePipe>
          <Header> CRYSTAL PIPE </Header>
          <MobileFish src="images/fish.png"></MobileFish>
          <Header> CRYSTAL PIPE </Header>
        </Content>
      </MobileOnly>
    </Content>
  );
}

const Content = styled.div`
  margin-bottom: 50px;
  margin-top: -240px;
  width: 100%;
  padding: 23px 23px 23px 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media ${mediaQueries.tablet} {
    margin-top: 40px;
    padding: 0 10px 10px 10px;
  }
  @media ${mediaQueries.desktop} {
    margin-top: 40px;
  }
`;

const Container = styled.div`
  width: inherit;
  padding: 23px 23px 23px 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
`;

const Image = styled.img`
  display: flex;
  width: 400px;

  @media ${mediaQueries.tablet} {
    display: flex;
    margin-top: 50px;
    width: 336.77px;
    height: 440.87px;
  }
`;

const Divider = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  height: 1px;
  width: 88%;
  padding: 0 20px 0px 20px;
`;

const MobilePipe = styled.img`
  width: 356.21px;
  height: 356.21px;
`;

const MobileFish = styled.img`
  width: 312.42px;
  height: 234.04px;
`;

const Header = styled.div`
  font-family: visuelt-med;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 58px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
  color: #000000;
  z-index: 100;
  width: 600px;

  @media ${mediaQueries.tablet} {
    font-size: 24px;
    margin-top: 40px;
    width: 325px;
  }
`;

const MiniHeader = styled.div`
  width: 97px;
  height: 32px;
  left: 131.5px;
  top: 1422.43px;
  margin-bottom: 40px;
  cursor: pointer;

  font-family: visuelt;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 180%;
  text-decoration-line: underline;
  
  color: #000000;
  }
`;

const LeftHeader = styled.div`
  font-family: visuelt-med;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 58px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;
  width: 500px;
  display: flex;
  align-items: left;
  flex-direction: column;

  @media ${mediaQueries.tablet} {
    font-size: 24px;
    margin-top: 60px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    width: 330px;
  }
`;

const RightHeader = styled.div`
  font-family: visuelt-med;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 58px;
  letter-spacing: 0em;
  text-align: right;
  color: #000000;
  width: 400px;
  display: flex;
  align-items: right;
  flex-direction: column;

  @media ${mediaQueries.tablet} {
    font-size: 25px;
  }
`;

const MainHero = styled.div`
  width: inherit;
  background: url("images/image 18.png") no-repeat center top;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;

  @media ${mediaQueries.tablet} {
    background-size: cover;
    height: 643px;
    z-index: 3;
    align-items: flex-start;
  }
`;

const MainHeroContent = styled.div`
  z-index: 2;
  padding-top: 80px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media ${mediaQueries.tablet} {
    padding-top: 10px;
  }
`;

const Subheader = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: #000000;
  line-height: 29px;
  height: 174px;
  font-weight: 400;

  margin-bottom: 100px;
`;

const HeroHeader = styled.div`
  font-family: visuelt;
  font-size: 160px;
  line-height: 188px;
  align-items: center;

  color: transparent;
  font-weight: 700;
  -webkit-text-stroke-width: 2.5px;
  -webkit-text-stroke-color: white;
  margin-bottom: 50px;

  @media ${mediaQueries.tablet} {
    margin-top: 10px;
    font-size: 115px;
    line-height: 140px;
  }
`;

const TopButton = styled.div`
  background-color: #AA97F6;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  display: flex;
  color: white;
  font-size: 24px;
  line-height: 40px;
  font-weight: 400;
  padding: 25px 10px;
  z-index: 100;
  width: 128px;
  height: 128px;
  cursor: pointer;

  position: relative;
  left: -182px;
  top: -80px;

}
`;

const BottomButton = styled.div`
  background-color: #AA97F6;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  display: flex;
  color: white;
  font-size: 24px;
  line-height: 40px;
  font-weight: 400;
  padding: 25px 10px;
  z-index: 100;
  width: 128px;
  height: 128px;
  cursor: pointer;

  position: relative;
  left: 737.75px;
  top: -180.5px;

}
`;
