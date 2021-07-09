import { useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";

export function Footer(): JSX.Element {
  const [email, setEmail] = useState("");

  return (
    <>
      <DesktopOnly>
        <Container>
          <WideDiv>
            <Header>About</Header>
            <Subheader>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut.
            </Subheader>
          </WideDiv>
          <NarrowDiv>
            <SubmenuSection>
              <Header>Links</Header>
              <SubmenuItem>Shop</SubmenuItem>
              <SubmenuItem>Search</SubmenuItem>
              <SubmenuItem>About</SubmenuItem>
              <SubmenuItem>Contact</SubmenuItem>
              <SubmenuItem>FAQ</SubmenuItem>
            </SubmenuSection>
          </NarrowDiv>
          <NarrowDiv>
            <SubmenuSection>
              <SubmenuItemBold> ㅤ ‎</SubmenuItemBold>
              <SubmenuItem>Terms of Service</SubmenuItem>
              <SubmenuItem>Privacy Policy</SubmenuItem>
              <SubmenuItem>Refund Policy</SubmenuItem>
            </SubmenuSection>
          </NarrowDiv>
          <WideDiv>
            <SubmenuSection>
              <Header>Newsletter</Header>
              <SubmenuItem>
                {" "}
                Be the first to know about exclusive offers and product
                launches.
              </SubmenuItem>
            </SubmenuSection>
            <EmailContainer>
              <EmailInput
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </EmailContainer>
            <CTA
              // ADD REAL LAUNCHES AND STUFFS
              onClick={() => console.log(email)}
            >
              {" "}
              Subscribe{" "}
            </CTA>
          </WideDiv>
        </Container>
      </DesktopOnly>
      <MobileOnly>
        <MobileContainer>
          <Header>Newsletter</Header>
          <SubmenuItem>
            Be the first to know about exclusive offers and product launches.
          </SubmenuItem>
          <EmailContainer>
            <EmailInput
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CTA onClick={() => console.log(email)}>Subscribe </CTA>
          </EmailContainer>

          <Header>About</Header>
          <Subheader>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </Subheader>
          <Container style={{ backgroundColor: "rgba(1, 1, 1, 0.0)" }}>
            <NarrowDiv>
              <Header>Links</Header>
              <SubmenuItem>Shop</SubmenuItem>
              <SubmenuItem>Search</SubmenuItem>
              <SubmenuItem>About</SubmenuItem>
              <SubmenuItem>Contact</SubmenuItem>
              <SubmenuItem>FAQ</SubmenuItem>
            </NarrowDiv>
            <NarrowDiv style={{ paddingLeft: "75px" }}>
              <SubmenuItem> </SubmenuItem>
              <SubmenuItem>Terms of Service</SubmenuItem>
              <SubmenuItem>Privacy Policy</SubmenuItem>
              <SubmenuItem>Refund Policy</SubmenuItem>
            </NarrowDiv>
          </Container>
        </MobileContainer>
      </MobileOnly>
    </>
  );
}

const Container = styled.footer`
  width: 100%;
  padding: 60px 47px 45px;
  display: flex;
  background-color: rgba(1, 1, 1, 0.011);
  flex-direction: row;
  justify-content: start;
  @media ${mediaQueries.phone} {
    justify-content: start;
    padding: 10px 0px 0px;
    gap: 100px;
  }
`;
const MobileContainer = styled.footer`
  background-color: rgba(242, 242, 242, 0.56);
  padding: 62px 27px 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const WideDiv = styled.div`
  width: 37%;
  display: inline-block;

  @media ${mediaQueries.tablet} {
    padding: 22px 27px 45px;
  }
`;
const NarrowDiv = styled.div`
  display: inline-block;
  padding: 0 17px 45px;
  @media ${mediaQueries.tablet} {
    padding: 22px 0px 25px;
    margin-top: 20px;
  }
`;

const Header = styled.h2`
  font-size: 16px;
  font-weight: 200px;
  font-family: "inter";
  text-align: left;
  margin-top: -15px;

  @media ${mediaQueries.phone} {
    font-size: 12px;
    margin-bottom: 17px;
  }
`;

const Subheader = styled.p`
  width: 100%;
  text-align: left;
  display: inline-block;
  font-size: 12px;
  margin: 0 auto;

  line-height: 30px;
  font-weight: 300;

  @media ${mediaQueries.tablet} {
    &.MuiInputBase-root {
      width: 48%;
      font-size: 113px;
    }
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

const EmailContainer = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  text-align: center;
`;

const SubmenuSection = styled.div`
  outline: none;
  display: inline-block;
`;

const SubmenuItem = styled.div`
  margin-bottom: 18px;
  text-align: left;

  // for items that aren't actually links yet
  font-size: 12px;
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

const CTA = styled.div`
  position: relative;
  background-color: #000000;
  color: white;
  text-align: center;
  padding: 13px 40px;
  float: right;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-weight: 350;
  width: 158px;
  height: 42px;
  margin-top: 20px;

  @media ${mediaQueries.tablet} {
    width: 120px;
    padding: 13px 25px;
    font-size: 15px;
    margin-top: 16px;
    margin-bottom: 25px;
  }

  &:hover {
    background-color: #04a09a !important;
  }
`;

const EmailInput = styled(OutlinedInput)`
  &.MuiInputBase-root {
    width: 100%;
    height: 44px;
    padding: 4px 10px;
    border-radius: 0;
    background-color: #000000;
    box-shadow: 0px 3px 4px #e1ddd7;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-input {
    color: white;
  }

  @media ${mediaQueries.tablet} {
    &.MuiInputBase-root {
      width: 100%;
      font-size: 13px;
    }
  }
`;
