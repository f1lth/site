import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { mediaQueries } from "styles/media-queries";
import { Info } from "./components/info";
import styled from "styled-components";

function About(): JSX.Element {
  return (
    <Container>
      <Nav darkBackground page="menu" />
      <Content>
        <div>
          <Info />
        </div>
      </Content>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background-color: #ffffff;

  @media ${mediaQueries.phone} {
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 45px;
  display: flex;

  @media ${mediaQueries.largeTablet} {
    flex-direction: column;
    padding: 18px 25px;
  }
`;

export default About;
