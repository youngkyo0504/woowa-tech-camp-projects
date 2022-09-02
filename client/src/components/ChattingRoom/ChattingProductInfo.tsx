import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { SalesStatusEnum } from '@customTypes/product';
import useProduct from '@queries/useProduct';
import mixin from '@style/mixin';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ChattingProductInfoProps {
  productId: number;
}

export default function ChattingProductInfo({ productId }: ChattingProductInfoProps) {
  const { product } = useProduct(productId);
  const navigate = useNavigate();
  const salesStatus = product?.salesStatus || 'sale';
  return (
    <Container onClick={() => navigate(`/product/${product?.id}`)}>
      <FlexColumnContainer>
        <img src={product?.thumbnails[0]} alt="" />
      </FlexColumnContainer>
      <FlexColumnContainer isFull gap="4px">
        <Text size="medium">{product?.name}</Text>
        <Text color={colors.grey1} size="small">
          {product?.price.toLocaleString('kr')}원
        </Text>
      </FlexColumnContainer>
      <FlexColumnContainer>
        <StatusContainer> {SalesStatusEnum[salesStatus]}</StatusContainer>
      </FlexColumnContainer>
    </Container>
  );
}

const StatusContainer = styled.div`
  display: flex;
  font-size: 18px;
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
  gap: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 1.4rem;
  margin-top: 3.5rem;
  box-shadow: inset 0px -1px 0px #d7d7d7;
  gap: 14px;
  ${mixin.flexMixin({ direction: 'row' })};

  img {
    height: 60px;
    width: 60px;
    border: 1px solid ${colors.grey3};
    border-radius: 6px;
  }
`;

const FlexColumnContainer = styled.div<{ isFull?: boolean; gap?: string }>`
  ${mixin.flexMixin({ direction: 'column', justify: 'center' })};
  ${({ isFull }) =>
    isFull &&
    css`
      flex: 2;
    `};

  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap};
    `};
  height: 100%;
`;
