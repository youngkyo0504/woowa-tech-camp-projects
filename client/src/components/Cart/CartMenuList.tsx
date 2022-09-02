import React, { useRef } from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/cartContext';
import useSlide from '../../hooks/useSlide';
import mixin from '../../styles/mixin';
import CartMenuItem from './CartMenuItem';

const CartMenuList = () => {
  const { cart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollProps = useSlide<HTMLDivElement, HTMLDivElement>({
    key: 'cart',
    scrollRef,
    offsetRef: scrollRef,
  });
  return (
    <Wrapper>
      <ScrollWrapper ref={scrollRef} {...scrollProps}>
        {cart.map((cartItem, index) => (
          <CartMenuItem key={cartItem['optionHash']} cartItem={cartItem} />
        ))}
      </ScrollWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  margin-top: var(--space-3);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--grey200);
  border-bottom: 1px solid var(--grey200);
  height: calc(var(--screen-height) * 0.6);
  overflow-y: hidden;
  row-gap: var(--space-4);
`;
const ScrollWrapper = styled.div`
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  width:100%;
  margin-top: var(--space-3);
  height: calc(var(--screen-height) * 0.6);
  row-gap: var(--space-4);
  touch-action: pan-x;
  cursor: grab;
`;
export default CartMenuList;
