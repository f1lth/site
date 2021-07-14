import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";

export function Info(): JSX.Element {
  return (
    <Section>
      <SectionHeader>About</SectionHeader>
      Words!
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 64px;

  @media ${mediaQueries.tablet} {
    margin-bottom: 50px;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;

  @media ${mediaQueries.tablet} {
    width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  @media ${mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }
  @media ${mediaQueries.phone} {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
`;

const SectionHeader = styled.h2`
  font-family: "inter";
`;
