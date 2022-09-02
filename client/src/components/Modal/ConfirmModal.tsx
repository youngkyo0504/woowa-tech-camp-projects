import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/cartContext';
import { Button, ModalWrapper } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import { MinusIcon, PlusIcon, XIcon } from '../common/icons';
import { TitleText } from './MenuModal/MenuModal';
import { useChainingModal } from './useChainingModal';

const ConfirmModal: FC = ({}) => {
  const { modalActions } = useChainingModal();
  const { cart, cartActions } = useCart();
  const totalPrice = cartActions.getTotalPrice();
  const quantity = cartActions.getNumberOfProduct();

  useEffect(() => {
    if (quantity === 0) {
      modalActions.closeModal();
    }
  }, [quantity]);

  const CartList = cart.map(({ name, count, optionHash, option }) => (
    <ListItem key={optionHash}>
      <NameBox>
        {name} <OptionText>{option.join(', ')}</OptionText>
      </NameBox>
      <Flex>
        <CounterWrapper>
          <CounterIconButton onClick={cartActions.countDown(optionHash)}>
            <MinusIcon />
          </CounterIconButton>
          <Count>{count}</Count>
          <CounterIconButton onClick={cartActions.countUp(optionHash)}>
            <PlusIcon />
          </CounterIconButton>
        </CounterWrapper>
        <SVGWrapper onClick={cartActions.delete(optionHash)}>
          <XIcon />
        </SVGWrapper>
      </Flex>
    </ListItem>
  ));
  return (
    <ModalWrapper>
      <TitleText>주문 내역을 확인해주세요</TitleText>
      <List>{CartList}</List>
      <Box>
        <InfoBox>
          <span>총 수량: </span>
          <DangerText>{quantity}개</DangerText>
        </InfoBox>
        <InfoBox>
          <span>결제 금액: </span>
          <DangerText>{totalPrice.toLocaleString('kr')}원</DangerText>
        </InfoBox>
      </Box>
      <BtnList>
        <CancelBtn onClick={modalActions.closeModal}>이전</CancelBtn>
        <ConfirmBtn
          isActive={true}
          onClick={modalActions.openModal({ type: 'payment', props: {} })}
        >
          결제하기
        </ConfirmBtn>
      </BtnList>
    </ModalWrapper>
  );
};

export default ConfirmModal;
const InfoBox = styled.div`
  font-size: var(--text-xl);
  font-weight: 600;
`;
const DangerText = styled.span`
  color: #ea4a35;
`;

const OptionText = styled.span`
  font-size: var(--text-sm);
  color: var(--grey400);
`;
const CountBox = styled.span``;

const List = styled.ul`
  ${mixin.flexMixin({ direction: 'column' })};
  gap: var(--space-4);
  width: 500px;
  font-size: var(--text-lg);
  margin: 50px auto;
  height: 350px;
  overflow-y: scroll;
`;

const ListItem = styled.li`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })};
  width: 100%;
`;

const CounterWrapper = styled.div`
  ${mixin.flexMixin({ align: 'center' })}
  gap: var(--space-2);
`;

const CounterIconButton = styled(Button)`
  --px: var(--space-2);
  --py: var(--space-2);
  width: 24px;
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
const NameBox = styled.p`
  width: 300px;
`;
const Count = styled.span`
  font-size: var(--text-md);
  width: 20px;
  text-align: center;
`;
const SVGWrapper = styled.div`
  width: var(--space-5);
  height: var(--space-5);
  cursor: pointer;

  svg {
    fill: var(--grey200);
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
