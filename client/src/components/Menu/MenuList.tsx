import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { useMenuData } from '.';
import useSlide from '../../hooks/useSlide';
import { AnimatePresence } from '../../lib/animation/AnimatedPresence';
import AnimatedComponent from '../../lib/animation/animationComponent';
import MenuItem from './MenuItem';

const MenuList: FC = () => {
  const { selectedMenuItems } = useMenuData();
  const offsetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerProps = useSlide({ offsetRef, scrollRef, key: selectedMenuItems?.id || 'menuList' });
  return (
    <Wrapper ref={offsetRef}>
      <AnimatePresence>
        <MenuListWrapper
          {...pointerProps}
          slideRef={scrollRef}
          onPointerMove={pointerProps.onPointerMove}
          key={selectedMenuItems?.id}
          keyframeOption={{ duration: 400 }}
          onEnter={[
            { transform: 'translateY(20px)', opacity: '0' },
            { transform: 'translateY(0px)', opacity: '1' },
          ]}
          onExit={[
            { transform: 'translateY(0px)', opacity: '1' },
            { transform: 'translateY(-20px)', opacity: '0' },
          ]}
        >
          {selectedMenuItems &&
            selectedMenuItems.menuItem.map((item) => (
              <MenuItem key={item.id} menuItemData={item} />
            ))}
        </MenuListWrapper>
      </AnimatePresence>
    </Wrapper>
  );
};

export default MenuList;
const AnimationUl = AnimatedComponent('ul');

const MenuListWrapper = styled(AnimationUl)`
  display: grid;
  min-width: 100%;
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  row-gap: var(--space-5);
  column-gap: var(--space-6);
  touch-action: pan-x;
  cursor: grab;
`;

const Wrapper = styled.div`
  overflow-y: hidden;
  width: 100%;
`;
