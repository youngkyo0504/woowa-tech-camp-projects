import EmptyIndicator from '@components/common/EmptyIndicator';
import MySaleProductItem from '@components/MySaleProductItem';
import colors from '@constants/colors';
import { useMySalesProducts } from '@queries/useMySalesProducts';

export default function MySalesProductList() {
  const { data } = useMySalesProducts();

  return (
    <div>
      {data?.length ? (
        data.map((product) => (
          <MySaleProductItem
            product={product}
            key={product.id}
            productId={product.id}
            utilButtonInfo={{ type: 'more', color: colors.grey2 }}
          />
        ))
      ) : (
        <EmptyIndicator message="판매중인 상품이 없습니다" />
      )}
    </div>
  );
}
