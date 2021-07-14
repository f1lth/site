import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";
import { ProductCard } from "components/shared/product/product-card";

function Recommendation(props): JSX.Element {
  let { products } = props;
  return (
    <Container>
      <Title>you may also like</Title>
      <Grid>
        {(products || []).slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${mediaQueries.largePhone} {
    width: 100%;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #666666;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 22px;
  margin-top: 1em;
  @media ${mediaQueries.phone} {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
`;

export default Recommendation;
