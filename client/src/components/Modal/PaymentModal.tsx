import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/cartContext';
import { Button, ModalWrapper } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import { CashIcon, CreditCard, MinusIcon, PlusIcon, XIcon } from '../common/icons';
import { TitleText } from './MenuModal/MenuModal';
import { useChainingModal } from './useChainingModal';

const PaymentModal: FC = ({}) => {
  const { modalActions } = useChainingModal();
  const { cartActions } = useCart();
  const totalPrice = cartActions.getTotalPrice();

  return (
    <ModalWrapper>
      <TitleText>결제 방법을 선택해주세요</TitleText>
      <List>
        <PaymentLi onClick={modalActions.openModal({ type: 'cash', props: {} })}>
          <SVGWrapper>
            <CashIcon />
          </SVGWrapper>
          <Text>현금</Text>
        </PaymentLi>
        <PaymentLi onClick={modalActions.openModal({ type: 'credit', props: {} })}>
          <SVGWrapper>
            <CreditCard />
          </SVGWrapper>
          <Text>신용카드</Text>
        </PaymentLi>
      </List>
      <Box>
        <InfoBox></InfoBox>
        <InfoBox>
          <span>결제 금액: </span>
          <DangerText>{totalPrice.toLocaleString('kr')}원</DangerText>
        </InfoBox>
      </Box>
      <BtnList>
        <CancelBtn onClick={modalActions.closeModal}>취소</CancelBtn>
      </BtnList>
    </ModalWrapper>
  );
};

export default PaymentModal;
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
  ${mixin.flexMixin({})};
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
