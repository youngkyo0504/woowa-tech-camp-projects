import { Text } from '@components/common/Text';
import { ValidationMessage } from '@components/common/ValidationMessage';
import { useForm } from '@components/CustomForm/useForm';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import useCategory from '../../queries/useCategory';

interface CategorySelectorProps {
  categoryId?: number;
}

export default function CategorySelector({ categoryId: initialCategoryId }: CategorySelectorProps) {
  const { getCategories } = useCategory();
  const { data: categories } = getCategories();

  const validator = {
    exist: {
      errorMessage: '카테고리를 선택해주세요',
      validate: (value: null | number) => value !== null,
    },
  };

  const initialValue = initialCategoryId || 1;

  const {
    inputValue: selectedCategoryId,
    setInputValue: setSelectedCategoryId,
    errorMessage,
    validate,
  } = useForm('categoryId', initialValue, validator, { isInitialValid: true });

  const selectCategory = (categoryId: number) => () => {
    validate({ value: categoryId, validateProperties: ['exist'] });
    setSelectedCategoryId(categoryId);
  };

  return (
    <Container>
      <Text size="xSmall">(필수) 카테고리를 선택해주세요</Text>
      <ValidationMessage size="xSmall" color="red">
        {errorMessage}
      </ValidationMessage>
      <CategoriesContainer>
        {categories &&
          categories.map(({ name, id }) => (
            <ItemWrapper key={id} isActive={id === selectedCategoryId} onClick={selectCategory(id)}>
              <Text>{name}</Text>
            </ItemWrapper>
          ))}
      </CategoriesContainer>
    </Container>
  );
}

const ErrorMessage = styled(Text)`
  color: ${colors.red};
`;

const Container = styled.div`
  padding-bottom: 24px;

  border-bottom: 1px solid ${colors.grey3};
  color: ${colors.grey1};
  width: 100%;
  ${Text} {
    color: ${colors.grey2};
  }
`;
const ItemWrapper = styled.div<{ isActive?: boolean }>`
  padding: 4px 16px;
  border: 1px solid ${colors.grey3};
  border-radius: 999px;
  white-space: nowrap;

  background-color: ${({ isActive: active }) => (active ? colors.primary : colors.white)};
  ${Text} {
    color: ${({ isActive: active }) => (active ? colors.white : colors.grey1)};
    font-size: 14px;
  }
`;
const CategoriesContainer = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 0.8rem;
  ${mixin.flexMixin({ align: 'center' })};
  gap: 4px;
`;
