import colors from '@constants/colors';
import styled, { css } from 'styled-components';
import React from 'react';
import { Text } from './Text';

interface IDropDownItem {
  name: string;
  onClick?: (e: React.MouseEvent) => void;
  color?: string;
}

interface DropDownProps {
  dropDownItems: IDropDownItem[];
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export default function DropDown({
  dropDownItems,
  transform,
  top,
  bottom,
  left,
  right,
}: DropDownProps) {
  return (
    <Container top={top} bottom={bottom} transform={transform} left={left} right={right}>
      {dropDownItems.map((dropDownItem) => {
        const { name, onClick, color } = dropDownItem;
        return (
          <DropDownItem key={name} onClick={onClick}>
            <Text size="small" weight="bold" color={color}>
              {name}
            </Text>
          </DropDownItem>
        );
      })}
    </Container>
  );
}

const Container = styled.ul<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}>`
  position: absolute;
  ${({ top, bottom, left, right }) => css`
    top: ${top};
    bottom: ${bottom};
    left: ${left};
    right: ${right};
  `}
  ${({ transform }) =>
    css`
      transform: ${transform};
    `}
  z-index: 20;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);

  background-color: ${colors.grey3};
`;

const DropDownItem = styled.li`
  width: 10rem;
  height: 3rem;
  padding: 1rem;
  text-align: left;
  background-color: ${colors.offWhite};
  border-bottom: 1px solid ${colors.grey3};

  :hover {
    background-color: ${colors.grey3};
  }

  :last-child {
    border: none;
  }
`;
