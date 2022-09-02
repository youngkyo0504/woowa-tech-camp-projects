import React, { useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from '../../lib/animation/AnimatedPresence';
import { RelativeContainer } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import { MenuItem as IMenuItem } from '../../types/server/menu';
import { getTime } from '../../util/time';
import MenuModal from '../Modal/MenuModal/MenuModal';
import useModal from '../Modal/useModal';
import StatusDescription from './StatusDescription';

interface MenuItemProps {
  menuItemData: IMenuItem;
}

const SENSITIVITY = 0.16;

function MenuItem({ menuItemData }: MenuItemProps) {
  const { status, thumbnail, name, price } = menuItemData;
  const ref = useRef<HTMLDivElement>(null);
  const timeRef = useRef<number>(0);

  const { isModalOpen, toggleModal } = useModal();
  return (
    <>
      <Wrapper>
        <MenuItemContainer
          ref={ref}
          onClick={() => {
            const clickTime = getTime();
            const interval = clickTime - timeRef.current;
            const isClick = interval < SENSITIVITY;
            if (isClick) {
              toggleModal();
            }
          }}
          onPointerDown={() => {
            timeRef.current = getTime();
          }}
        >
          <RelativeContainer>
            <img draggable="false" src={thumbnail} alt={name} />
            <StatusDescription status={status} />
          </RelativeContainer>
          <div>
            <MenuText>{name}</MenuText>
            <PriceText>{price.toLocaleString('kr')}</PriceText>
          </div>
        </MenuItemContainer>
      </Wrapper>
      <AnimatePresence>
        {isModalOpen && (
          <MenuModal sharedRef={ref} menuItemData={menuItemData} toggleModal={toggleModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default MenuItem;
const Wrapper = styled.li`
  width: 80%;
`;
const MenuItemContainer = styled.div`
  cursor: pointer;
  background-color: white;
  flex-basis: 1/4;
  border-radius: 16px;
  ${mixin.flexMixin({ direction: 'column', align: 'center' })} p {
    text-align: center;
  }

  img {
    width: 100%;
  }
`;

const MenuText = styled.p`
  margin-top: var(--space-1);
  font-weight: 700;
`;

const PriceText = styled.p`
  font-weight: 500;
`;
