import styled from "styled-components";

interface FacebookProps {
  onClick?: () => void;
  color: string;
}

export function Facebook(props: FacebookProps): JSX.Element {
  const { onClick, color } = props;

  return (
    <StyledSvg
      width={13}
      height={24}
      viewBox="0 0 13 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M9.95004 4.06335H12.084V0.346728C11.7158 0.296082 10.4497 0.182129 8.97511 0.182129C5.89837 0.182129 3.79073 2.11738 3.79073 5.67428V8.94775H0.395508V13.1027H3.79073V23.5571H7.95342V13.1036H11.2113L11.7285 8.94873H7.95245V6.08626C7.95343 4.88537 8.27678 4.06335 9.95004 4.06335Z"
       fill={color}
       />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: pointer;
`;
