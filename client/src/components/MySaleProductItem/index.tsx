import Caption from '@components/common/Caption';
import CountIndicator from '@components/common/CountIndicator';
import LoadingIndicator from '@components/common/LoadingIndicator';
import { Text } from '@components/common/Text';
import Thumbnail from '@components/common/Thumbnail';
import LikeButton from '@components/LikeButton';
import MoreButton from '@components/MoreButton';
import colors from '@constants/colors';
import { IProductItem } from '@customTypes/product';
import mixin from '@style/mixin';
import { getPassedTimeString } from '@utils/common';
import { getLastAddress, getPriceString } from '@utils/product';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type UtilButtonType = 'like' | 'more';

export interface IUtilButtonInfo {
  type: UtilButtonType;
  color?: string;
}

interface ProductItemProps {
  productId: number;
  utilButtonInfo: IUtilButtonInfo;
  product: IProductItem;
}

export default function MySaleProductItem({
  product,
  productId,
  utilButtonInfo,
}: ProductItemProps) {
  const navigate = useNavigate();

  if (!product) return <LoadingIndicator />;
  const { type, color } = utilButtonInfo;
  const UtilButton =
    type === 'like' ? (
      <LikeButton productId={product.id} />
    ) : (
      <MoreButton productId={productId} color={color} />
    );

  const moveToDetailPage = () => {
    navigate(`/product/${product.id}`);
  };

  const { thumbnail, name, region, createdAt, price, likedUsers, chatRooms } = product;

  return (
    <Container onClick={moveToDetailPage}>
      <Thumbnail src={thumbnail} size="medium" />
      <ProductInfoContainer>
        <ProductName size="medium" weight="bold">
          {name}
        </ProductName>
        <Caption
          size="small"
          captions={[getLastAddress(region.address), getPassedTimeString(createdAt)]}
        />
        <Text size="small" weight="bold">
          {getPriceString(price)}
        </Text>
      </ProductInfoContainer>
      <UtilButtonWrapper>{UtilButton}</UtilButtonWrapper>
      <CountIndicatorWrapper>
        <CountIndicator type="chat" count={chatRooms.length} />
        <CountIndicator type="like" count={likedUsers.length} />
      </CountIndicatorWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${colors.grey2};
`;

const ProductName = styled(Text)`
  width: 9rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProductInfoContainer = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const UtilButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const CountIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;
`;
