import EmptyIndicator from '@components/common/EmptyIndicator';
import LoadingIndicator from '@components/common/LoadingIndicator';
import colors from '@constants/colors';
import { padding } from '@constants/padding';
import { PagedResponseDto } from '@customTypes/common';
import { IProductItem } from '@customTypes/product';
import { InfiniteData } from '@tanstack/react-query';
import { ReactNode } from 'react';
import styled from 'styled-components';
import ProductItem, { IUtilButtonInfo } from './ProductItem';

interface ProductItemListProps {
  products?: InfiniteData<PagedResponseDto<IProductItem>>;
  utilButtonInfo: IUtilButtonInfo;
  scrollTriger?: ReactNode;
}

export default function ProductItemList({
  products,
  utilButtonInfo,
  scrollTriger,
}: ProductItemListProps) {
  const isEmpty = products && !products?.pages[0].data.length;
  return isEmpty ? (
    <EmptyIndicator message="가락동 디지털단지에 좋은 물건이 많다는 소문이 있던데...." />
  ) : (
    <MainPageWrapper>
      {products?.pages.map((page) =>
        page.data.map((product) => (
          <ProductItem key={product.id} productId={product.id} utilButtonInfo={utilButtonInfo} />
        )),
      )}
      {scrollTriger}
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div`
  padding-top: ${padding.pageTop};
  background-color: ${colors.white};
  height: 100%;
  overflow-y: auto;
`;
