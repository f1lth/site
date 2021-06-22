import { useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

export function Footer(): JSX.Element {
  const [email, setEmail] = useState("");

  return (
    <Container>
      <WideDiv>
        <Header>About</Header>
          <Subheader>
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut.
          </Subheader>
      </WideDiv>
      <NarrowDiv>
        <SubmenuSection>
          <SubmenuItemBold>Links</SubmenuItemBold>
          <SubmenuItem>Shop</SubmenuItem>
          <SubmenuItem>Search</SubmenuItem>
          <SubmenuItem>About</SubmenuItem>
          <SubmenuItem>Contact</SubmenuItem>
          <SubmenuItem>FAQ</SubmenuItem>
        </SubmenuSection>
      </NarrowDiv>
      <NarrowDiv>
        <SubmenuSection>
        <SubmenuItemBold> ㅤ  ‎</SubmenuItemBold>
          <SubmenuItem>Terms of Service</SubmenuItem>
          <SubmenuItem>Privacy Policy</SubmenuItem>
          <SubmenuItem>Refund Policy</SubmenuItem>
        </SubmenuSection>
      </NarrowDiv>
      <WideDiv>
      <SubmenuSection>
        <SubmenuItemBold>Newsletter</SubmenuItemBold>
          <SubmenuItem> Be the first to know about 
            exclusive offers and product 
            launches.
          </SubmenuItem>
        </SubmenuSection>
        <EmailContainer>
          <EmailInput
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <img src="icons/right-arrow-circle.svg" />
              </InputAdornment>
            }
          />
      </EmailContainer>
      </WideDiv>
      
      
    </Container>
  );
}

const Container = styled.footer`
  background-color: rgba(242,242,242, 0.56);
  padding: 120px 0 150px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media ${mediaQueries.phone} {
    padding: 62px 27px 45px;
  }
`;

const WideDiv = styled.div`
  margin-left: 60px;
  margin-right: 60px;
  display: inline-block;

  @media ${mediaQueries.tablet} {
    padding: 22px 27px 45px;
  }
`;
const NarrowDiv = styled.div`
  display: inline-block;
  padding: 22px 27px 45px;
  @media ${mediaQueries.tablet} {
    padding: 22px 27px 25px;
  }
`;

const Header = styled.h2`
  font-size: 20px;
  display: inline-block;
  font-weight: 700px;
  text-align: center;
  margin-botton: 20px;

  @media ${mediaQueries.phone} {
    font-size: 30px;
    margin-bottom: 17px;
  }
`;

const Subheader = styled.p`
  text-align: left;
  display: inline-block;
  font-size: 14px;
  width: 430px;
  margin: 0 auto 43px;
  line-height: 25px;
  font-weight: 300;

  @media ${mediaQueries.phone} {
    width: 100%;
    margin-bottom: 35px;
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
  display: inline-block;
  text-align: center;
  margin-bottom: 70px;

  @media ${mediaQueries.phone} {
    margin-bottom: 50px;
  }
`;

const SubmenuSection = styled.div`
  outline: none;
  display: inline-block;
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

const SocialLinksList = styled.ul`
  text-align: center;
  padding: 0;
  margin-bottom: 28px;
`;

const SocialLinksListItem = styled.li`
  display: inline;

  margin-right: 43px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 11px;
`;

const EmailInput = styled(OutlinedInput)`
  &.MuiInputBase-root {
    width: 500px;
    padding: 6px 10px;
    border-radius: 0;
    background-color: #ffffff;
    box-shadow: 0px 3px 4px #e1ddd7;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  @media ${mediaQueries.phone} {
    &.MuiInputBase-root {
      width: 100%;
      font-size: 13px;
    }
  }
`;
