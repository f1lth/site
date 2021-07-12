import styled from "styled-components";

interface searchIconProps {
  height?: number;
  width?: number;
  isDark?: boolean;
  className?: string;
  onClick?: () => void;
}

export function SearchIcon(props: searchIconProps): JSX.Element {
  const { isDark, height = 30, width = 30, className = "", onClick } = props;
  const color = isDark ? "#1F2B49" : "#000000";

  return (
    <StyledSvg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 23 23"
      fill={color}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: pointer;
`;
