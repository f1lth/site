import { useState } from "react";
import styled from "styled-components";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Effects } from "api/queries/menu.graphql";
import { ListCheckbox } from "components/shared/svg/list-checkbox";

import { MenuFilterHeader } from "./menu-filter-header";
import { displayNameForEffect } from "utils/enum-to-display-name/effect";

const EFFECTS = [
  Effects.Calm,
  Effects.ClearMind,
  Effects.Creative,
  Effects.Energetic,
  Effects.Focused,
  Effects.Happy,
  Effects.Inspired,
  Effects.Relaxed,
  Effects.Sleepy,
  Effects.Uplifted,
];

interface EffectFilterProps {
  selectedEffects: Set<Effects>;
  onEffectSelect: (effect: Effects) => void;
}

export function EffectsFilter(props: EffectFilterProps): JSX.Element {
  const { selectedEffects, onEffectSelect } = props;
  const [isEffectExpanded, setIsEffectExpanded] = useState(true);

  return (
    <Container>
      <MenuFilterHeader
        name="EFFECTS"
        onClick={() => setIsEffectExpanded(!isEffectExpanded)}
        isExpanded={isEffectExpanded}
      />
      {isEffectExpanded && (
        <StyledList>
          {EFFECTS.map((effect) => (
            <ListItem key={effect} onClick={() => onEffectSelect(effect)}>
              <ListItemIcon>
                <ListCheckbox isSelected={selectedEffects.has(effect)} />
              </ListItemIcon>
              <ListItemText primary={displayNameForEffect(effect)} />
            </ListItem>
          ))}
        </StyledList>
      )}
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid #ddd9d2;

  &:last-of-type {
    border: none;
  }
`;

const StyledList = styled(List)`
  padding: 0px !important;

  & .MuiListItem-root {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 0;
    cursor: pointer;
  }

  & .MuiTypography-root {
    font-size: 13px;
  }

  & .MuiListItemIcon-root {
    min-width: 35px;
  }
`;
