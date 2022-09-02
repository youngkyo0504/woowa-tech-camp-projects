import React, { FC } from 'react';
import styled from 'styled-components';
import { useMenuAction, useMenuData } from '.';
import { Button } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';

const MenuTabs: FC = ({}) => {
  const { categories, selectedCategoryId } = useMenuData();
  const action = useMenuAction();

  return (
    <>
      <Wrapper>
        <MenuList>
          {categories.map(({ id, name }) => (
            <MenuBtnWrapper key={id}>
              <MenuBtn
                onClick={action.setSelectedCategoryID(id)}
                isActive={id === selectedCategoryId}
              >
                {name}
              </MenuBtn>
            </MenuBtnWrapper>
          ))}
        </MenuList>
      </Wrapper>
    </>
  );
};

export default MenuTabs;

const Wrapper = styled.nav`
  padding: var(--space-5) var(--space-5);
  width: 100%;
`;

const MenuList = styled.ul`
  ${mixin.flexMixin({ wrap: 'wrap' })};
  column-gap: 29px;
  row-gap: var(--space-4);
  width: 100%;
`;

const MenuBtn = styled(Button)<{ isActive?: boolean }>`
  border-radius: var(--rounded-lg);

  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  ${({ isActive }) => isActive && '--bg-color: var(--selected); --text-color: white'};
  width: 100%;
`;

const MenuBtnWrapper = styled.li`
  --menu-btn-width: 130px;
  ${mixin.flexMixin({ align: 'center' })}
  width: var(--menu-btn-width);
`;
