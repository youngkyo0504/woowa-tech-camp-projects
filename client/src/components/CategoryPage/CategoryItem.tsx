import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { ICategory } from '@customTypes/category';
import mixin from '@style/mixin';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CategoryItemProps {
  category: ICategory;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const { id, name } = category;
  const navigate = useNavigate();
  const moveToCategoryProductPage = () => {
    navigate(`/category/products/${id}`, { state: { categoryName: name } });
  };
  return (
    <Container>
      <CategoryImage onClick={moveToCategoryProductPage} src={categoryIcons[id - 1]} />
      <Text size="small">{name}</Text>
    </Container>
  );
}

const Container = styled.div`
  ${mixin.flexMixin({ direction: 'column', align: 'center', justify: 'center' })}
  gap: 1rem;
  width: 6rem;
  margin-top: 2rem;
`;

const CategoryImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto;
`;

const categoryIcons = [
  '/Icons/digital.png',
  '/Icons/appliance.png',
  '/Icons/furniture.png',
  '/Icons/game.png',
  '/Icons/life.png',
  '/Icons/sports.png',
  '/Icons/female-fashion.png',
  '/Icons/male-fashion.png',
  '/Icons/baby.png',
  '/Icons/beauty.png',
  '/Icons/pet.png',
  '/Icons/book.png',
  '/Icons/plant.png',
  '/Icons/gold.png',
];
