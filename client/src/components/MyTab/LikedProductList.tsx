import EmptyIndicator from '@components/common/EmptyIndicator';
import ProductItem from '@components/ProductItemList/ProductItem';
import { useLikedProducts } from '@queries/useMyLikedProduct';

export default function LikedProductList() {
  const { data } = useLikedProducts();

  return (
    <div>
      {data?.length ? (
        data.map((product) => (
          <ProductItem key={product.id} productId={product.id} utilButtonInfo={{ type: 'like' }} />
        ))
      ) : (
        <EmptyIndicator message="찜한 상품이 없습니다." />
      )}
    </div>
  );
}
