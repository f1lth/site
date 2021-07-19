import styled from "styled-components";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";

interface MenuFilterHeaderProps {
  name: string;
  onClick: () => void;
  isExpanded?: boolean;
}

export function MenuFilterHeader(props: MenuFilterHeaderProps): JSX.Element {
  const { name, onClick, isExpanded } = props;
  return (
    <Header onClick={onClick}>
      <span>{name}</span>
      <Chevron
        direction={isExpanded ? ChevronDirection.Down : ChevronDirection.Right}
        color="#000"
        height={12}
        width={12}
      />
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 67px;
  user-select: none;
  cursor: pointer;
`;
