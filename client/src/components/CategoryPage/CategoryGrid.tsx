import PageContainer from '@components/common/PageContainer';
import useCategory from '@queries/useCategory';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

export default function CategoryGrid() {
  const { getCategories } = useCategory();
  const { data: categories } = getCategories();

  return (
    <Container>
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Container>
  );
}

const Container = styled(PageContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  overflow: auto;
`;
