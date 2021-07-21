import { mediaQueries } from "styles/media-queries";
import styled from "styled-components";

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

const SectionHeader = styled.h2`
  font-family: "visuelt";
`;
