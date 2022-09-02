import CategoryGrid from '@components/CategoryPage/CategoryGrid';
import NavigationBar from '@components/common/NavigationBar';
import TransitionPage from '@components/TransitionPage';

export default function CategoryListPage() {
  return (
    <TransitionPage depth={1}>
      <NavigationBar title="카테고리" />
      <CategoryGrid />
    </TransitionPage>
  );
}
