import React, { createContext, FC, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import mixin from '../../styles/mixin';
import { Menu } from '../../types/server/menu';

interface MenuProps {
  menuItems: Menu[];
  children: React.ReactNode;
}

interface Actions {
  setSelectedCategoryID: (id: number) => () => void;
}

interface Data {
  selectedMenuItems: Menu | undefined;
  selectedCategoryId: number;
  categories: Omit<Menu, 'menuItem'>[];
}

const MenuDataContext = createContext<Data>(null!);

const MenuActionsContext = createContext<Actions>(null!);

const MenuGroup: FC<MenuProps> = ({ menuItems, children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(menuItems[0].id);

  const selectedMenuItems = menuItems.find(({ id }) => id === selectedCategoryId);

  const categories = menuItems.map(({ id, name }) => {
    return { id, name };
  });

  const actions: Actions = useMemo(() => {
    return { setSelectedCategoryID: (id: number) => () => setSelectedCategoryId(id) };
  }, []);

  return (
    <>
      <MenuDataContext.Provider value={{ categories, selectedMenuItems, selectedCategoryId }}>
        <MenuActionsContext.Provider value={actions}>
          <MenuWrapper>{children}</MenuWrapper>
        </MenuActionsContext.Provider>
      </MenuDataContext.Provider>
    </>
  );
};

export default MenuGroup;

export const useMenuData = () => {
  const value = useContext(MenuDataContext);

  if (!value) {
    throw new Error('MenuDataContext does not exist in react tree');
  }
  return value;
};

export const useMenuAction = () => {
  const value = useContext(MenuActionsContext);

  if (!value) {
    throw new Error('MenuDataContext does not exist in react tree');
  }
  return value;
};

const MenuWrapper = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  overflow-x: hidden;
  height: 100%;
`;
