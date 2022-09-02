import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { sendOrder } from '../../api';
import { useCart } from '../../contexts/cartContext';
import { Button, ModalWrapper } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import { Order, Payment } from '../../types/server/order';
import { TitleText } from './MenuModal/MenuModal';
import { useChainingModal } from './useChainingModal';

const CashModal: FC = ({}) => {
  const { modalActions } = useChainingModal();
  const { cart, cartActions } = useCart();
  const [inputEnabled, setInputEnabled] = useState(true);
  const [totalInput, setTotalInput] = useState(0);

  const totalPrice = useMemo(() => {
    return cartActions.getTotalPrice();
  }, []);

  const order = async () => {
    if (inputEnabled) {
      return;
    }
    const orderItems: Order['orderItems'] = cart.map(({ menuId, count }) => {
      return { menuItemId: menuId, count };
    });
    const newOrder: Order = {
      paidAmount: totalInput,
      totalAmount: totalPrice,
      orderItems,
      paymentMethod: Payment.CASH,
    };

    const receipt = await sendOrder(newOrder);
    modalActions.openModal({ type: 'order', props: { receipt } })();
  };

  const CashInputs = [500, 1000, 5000, 10000].map((money) => (
    <PaymentLi
      key={money}
      onClick={() => {
        if (!inputEnabled) {
          return;
        }

        const newTotalInput = totalInput + money;
        if (newTotalInput >= totalPrice) {
          setInputEnabled(false);
        }

        setTotalInput(totalInput + money);
      }}
    >
      <Text>{money.toLocaleString('kr')}</Text>
    </PaymentLi>
  ));

  return (
    <ModalWrapper>
      <TitleText>현금을 투입해주세요</TitleText>
      <Box>
        <InfoBox>
          <span>결제 금액: </span>
        </InfoBox>
        <InfoBox>
          <DangerText>{totalPrice.toLocaleString('kr')}원</DangerText>
        </InfoBox>
      </Box>
      <Box>
        <InfoBox>
          <span>투입 금액: </span>
        </InfoBox>
        <InfoBox>
          <DangerText>{totalInput.toLocaleString('kr')}원</DangerText>
        </InfoBox>
      </Box>
      <List>{CashInputs}</List>

      <BtnList>
        <CancelBtn onClick={modalActions.closeModal}>취소</CancelBtn>
        <ConfirmBtn isActive={!inputEnabled} onClick={order}>
          결제하기
        </ConfirmBtn>
      </BtnList>
    </ModalWrapper>
  );
};

export default CashModal;
const InfoBox = styled.div`
  font-size: var(--text-xl);
  font-weight: 600;
`;
const Text = styled.p`
  margin-top: var(--space-1);
`;
const DangerText = styled.span`
  color: #ea4a35;
`;

const List = styled.ul`
  ${mixin.flexMixin({ justify: 'space-around', align: 'center' })};
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
  margin-top: 12px;
`;

const ModalBtn = styled(Button)`
  width: 48%;
  color: white;
  --py: var(--space-3);
  border-radius: var(--rounded-md);
`;
const CancelBtn = styled(ModalBtn)`
  --bg-color: var(--selected);
`;
const ConfirmBtn = styled(ModalBtn)<{ isActive: boolean }>`
  --bg-color: var(--grey300);
  ${({ isActive }) => isActive && '--bg-color: var(--primary-1)'};
`;
const BtnList = styled.div`
  width: 500px;
  margin: 0 auto;
  ${mixin.flexMixin({})};
  justify-content: space-between;
`;
