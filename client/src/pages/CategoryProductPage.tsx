import { getRegionProducts } from '@apis/product';
import NavigationBar from '@components/common/NavigationBar';
import ProductItemList from '@components/ProductItemList';
import TransitionPage from '@components/TransitionPage';
import { IProductItem } from '@customTypes/product';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import useCategory from '@queries/useCategory';
import { useUser } from '@queries/useUser';
import { useLocation, useParams } from 'react-router-dom';

interface pageState {
  categoryName: string;
}

export default function CategoryProductPage() {
  const { categoryId } = useParams();
  const { getCategories } = useCategory();
  const { data: categories } = getCategories();

  const { user } = useUser();

  const primaryRegion = user.regions.find((region) => region.isPrimary) || user.regions[0];
  const queryKey = ['products', primaryRegion.id, Number(categoryId)];
  const category = categories?.find((categoryItem) => categoryItem.id === Number(categoryId));
  const { data, Trigger } = useInfiniteScroll<IProductItem>({
    queryKey,
    fetchFunction: (pageParam?: number) =>
      getRegionProducts({
        regionId: primaryRegion.id,
        categoryId: Number(categoryId),
        start: pageParam,
      }),
  });

  return (
    <TransitionPage depth={2}>
      <NavigationBar title={category?.name} />
      <ProductItemList
        products={data}
        utilButtonInfo={{ type: 'like' }}
        scrollTriger={<Trigger />}
      />
    </TransitionPage>
  );
}
