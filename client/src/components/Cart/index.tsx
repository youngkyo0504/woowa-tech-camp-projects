import React, { FC } from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/cartContext';
import { Button } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import Modal from '../Modal';
import { useChainingModal } from '../Modal/useChainingModal';
import CartMenuList from './CartMenuList';

// interface CartProps {
//   name?: string;
// }

const Cart: FC = ({}) => {
  const { cart, cartActions } = useCart();
  const { modalMap, modalActions, modalInfo } = useChainingModal();
  const totalPrice = cartActions.getTotalPrice();
  const { type, props } = modalInfo;

  const ModalComponent = modalMap[modalInfo['type']];
  return (
    <>
      <Wrapper>
        <Title>장바구니</Title>
        <Description>먹고 가요</Description>
        <CartMenuList />
        <SubTitle>{totalPrice.toLocaleString('kr')} 원</SubTitle>
        <TotalPrice></TotalPrice>
        <TimeText>3 초 남음</TimeText>
        <BtnWrapper>
          <CancelBtn onClick={cartActions.deleteAll}>전체취소</CancelBtn>
          <BuyBtn onClick={modalActions.openModal({ type: 'confirm', props: {} })}>결제하기</BuyBtn>
        </BtnWrapper>
      </Wrapper>
      {type !== 'none' && (
        <Modal>
          <ModalComponent {...props} />
        </Modal>
      )}
    </>
  );
};

export default Cart;

const Wrapper = styled.article`
  width: 240px;
  flex-shrink: 0;
  height: 100%;
  padding: var(--space-5) var(--space-5);
  background-color: var(--grey50);
  border-radius: calc(var(--screen-width) / (30));
  border-top-right-radius: calc(var(--screen-width) / (30));
  border-bottom-right-radius: calc(var(--screen-width) / (30));
`;

const Title = styled.p`
  font-size: var(--text-xl);
  font-family: var(--display-font);
`;

const Description = styled.p`
  color: var(--grey500);
  font-weight: 600;
`;

const BuyBtn = styled(Button)`
  --bg-color: var(--primary-1);
  width: 100%;
  --text-color: white;
  border-radius: var(--rounded-md);
  font-weight: 700;
`;

const CancelBtn = styled(Button)`
  --bg-color: var(--selected);
  width: 100%;
  --text-color: white;
  border-radius: var(--rounded-md);
  font-weight: 700;
`;

const BtnWrapper = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  margin-top: var(--space-2);
  row-gap: var(--space-1);
`;

const TimeText = styled.p`
  color: var(--grey500);
  text-align: right;
`;

const SubTitle = styled.p`
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-family: var(--display-font);
  color: var(--grey500);
  text-align: right;
`;

const TotalPrice = styled.p`
  margin-top: var(--space-1);
  font-size: var(--text-md);
  font-family: var(--display-font);
  color: var(--grey900);
`;
