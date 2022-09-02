import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/cartContext';
import { Button, ModalWrapper } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import { TitleText } from './MenuModal/MenuModal';
import { useChainingModal } from './useChainingModal';
import CreditMotion from '../../assets/giphy.png';
import { Order, Payment } from '../../types/server/order';
import { sendOrder } from '../../api';

const CreditModal: FC = ({}) => {
  const { modalActions } = useChainingModal();
  const { cartActions, cart } = useCart();
  const totalPrice = cartActions.getTotalPrice();
  const order = async () => {
    const orderItems: Order['orderItems'] = cart.map(({ menuId, count }) => {
      return { menuItemId: menuId, count };
    });
    const newOrder: Order = {
      paidAmount: totalPrice,
      totalAmount: totalPrice,
      orderItems,
      paymentMethod: Payment.CREDIT,
    };

    return await sendOrder(newOrder);
  };

  useEffect(() => {
    const orderPromise = order();
    const time = setTimeout(() => {
      orderPromise.then((receipt) => {
        modalActions.openModal({ type: 'order', props: { receipt } })();
      });
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <ModalWrapper>
      <TitleText>카드를 넣어주세요</TitleText>
      <List>
        <img src={CreditMotion} alt="" />
      </List>
      <Box>
        <InfoBox></InfoBox>
      </Box>
      <BtnList>
        <CancelBtn onClick={modalActions.closeModal}>취소</CancelBtn>
      </BtnList>
    </ModalWrapper>
  );
};

export default CreditModal;
const InfoBox = styled.div`
  font-size: var(--text-xl);
  font-weight: 600;
`;

const List = styled.ul`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })};
  gap: var(--space-4);
  width: 500px;
  font-size: var(--text-lg);
  margin: 50px auto;
  height: 350px;
  overflow-y: scroll;
`;

const PaymentLi = styled.li`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: var(--rounded-lg);
  border: solid 1px var(--grey300);
`;

const Flex = styled.div`
  ${mixin.flexMixin({})}
  gap: var(--space-2);
`;
const Box = styled(Flex)`
  width: 500px;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SVGWrapper = styled.div`
  width: var(--space-8);
  height: var(--space-8);
  cursor: pointer;

  svg {
    fill: var(--grey200);
    stroke-width: 1px;
    stroke: var(--grey700);
    transition: all 0.3s ease-in-out;
  }

  svg:hover {
    fill: var(--grey300);
  }
`;

const ModalBtn = styled(Button)`
  width: 48%;
  color: white;
  --py: var(--space-3);
  border-radius: var(--rounded-md);
`;
const CancelBtn = styled(ModalBtn)`
  --bg-color: var(--selected);
  width: 100%;
`;

const BtnList = styled.div`
  width: 500px;
  margin: 0 auto;
  ${mixin.flexMixin({})};
  justify-content: space-between;
`;
