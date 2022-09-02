import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/cartContext';
import { useRouter } from '../../lib/router';
import { Button, ModalWrapper } from '../../styles/globalStyleComponent';
import mixin from '../../styles/mixin';
import { Receipt } from '../../types/server/order';
import { TitleText } from './MenuModal/MenuModal';
import { useChainingModal } from './useChainingModal';

export interface OrderModalProps {
  receipt?: Receipt;
}

const OrderModal: FC<OrderModalProps> = ({ receipt }) => {
  const { modalActions } = useChainingModal();
  const { cart, cartActions } = useCart();
  const [time, setTime] = useState(10);
  const timeOutRef = useRef<number>();
  const { navigate } = useRouter();
  const initialize = () => {
    cartActions.deleteAll();
    modalActions.closeModal();
    navigate('/');
  };
  const timeOut = () => {
    return window.setTimeout(() => {
      setTime((prev) => prev - 1);
      timeOutRef.current = timeOut();
    }, 1000);
  };

  useEffect(() => {
    timeOutRef.current = timeOut();

    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      initialize();
    }
  }, [time]);

  if (!receipt) {
    return <ModalWrapper>Order Modal</ModalWrapper>;
  }

  const { paidAmount, totalAmount, paymentMethod, orderNumber } = receipt;
  const difference = Number(paidAmount) - Number(totalAmount);

  const CartList = cart.map(({ name, count, price, optionHash, option }) => (
    <ListItem key={optionHash}>
      <NameBox>
        {name} <OptionText>{option.join(', ')}</OptionText>
      </NameBox>
      <Count>{count}개</Count>
      <Price>{price.toLocaleString('kr')}원</Price>
    </ListItem>
  ));
  return (
    <ModalWrapper>
      <TitleText>주문이 완료되었습니다</TitleText>
      <OrderNumberBox>주문 번호: {orderNumber}</OrderNumberBox>

      <List>{CartList}</List>

      <Flex>
        <Container>
          <Box>
            <InfoBox>
              <span>결제 방식: </span>
              <span> 현금</span>
            </InfoBox>
          </Box>
          <Box>
            <span>투입금액: </span>
            <span>{Number(paidAmount).toLocaleString('kr')}</span>
          </Box>
          <Box>
            <span>결제금액: </span>
            <span>{Number(totalAmount).toLocaleString('kr')}</span>
          </Box>
          <Box>
            <span>잔돈: </span>
            <span>{difference === 0 ? '' : difference.toLocaleString('kr')}</span>
          </Box>
        </Container>
        <TextCenter>(주의 : 이 화면은 {time}초뒤에 자동으로 사라집니다) </TextCenter>
        <BtnList>
          <ConfirmBtn isActive={true} onClick={initialize}>
            확인
          </ConfirmBtn>
        </BtnList>
      </Flex>
    </ModalWrapper>
  );
};

export default OrderModal;

const TextCenter = styled.p`
  text-align: center;
  width: 100%;
`;
const OrderNumberBox = styled(TitleText)`
  font-size: var(--text-lg);
  margin-top: 16px;
`;
const Container = styled.div`
  width: 500px;
  margin: 0 auto;
`;
const InfoBox = styled.div`
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: 12px;
`;
const Price = styled.span`
  font-size: var(--text-md);
  width: 100px;
  text-align: center;
`;
const OptionText = styled.span`
  font-size: var(--text-sm);
  color: var(--grey400);
`;

const List = styled.ul`
  ${mixin.flexMixin({ direction: 'column' })};
  gap: var(--space-4);
  width: 500px;
  font-size: var(--text-lg);
  margin: 30px auto 50px auto;
  min-height: 150px;
  overflow-y: scroll;
`;

const ListItem = styled.li`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })};
  width: 100%;
`;

const Flex = styled.div`
  height: 100%;
  ${mixin.flexMixin({ direction: 'column', justify: 'space-between' })}
  gap: var(--space-2);
`;
const Box = styled('div')`
  ${mixin.flexMixin({})}
  gap: var(--space-2);
  width: 500px;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const NameBox = styled.p`
  width: 200px;
`;
const Count = styled.span`
  font-size: var(--text-md);
  text-align: center;
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
  width: 100%;
  ${({ isActive }) => isActive && '--bg-color: var(--primary-1)'};
`;
const BtnList = styled.div`
  width: 500px;
  margin: 0 auto;
  ${mixin.flexMixin({})};
  justify-content: space-between;
`;
