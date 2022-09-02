import myAxios from '@apis/myAxios';
import { useQuery } from '@tanstack/react-query';
import { ICategory } from '../customTypes/category';

export async function fetchCategories() {
  try {
    const { data } = await myAxios.get<ICategory[]>(`/products/categories`);
    return data;
  } catch (e) {
    throw new Error('카테고리 조회에 실패했습니다.');
  }
}

export default function useCategory() {
  const getCategories = () => useQuery<ICategory[]>(['category'], fetchCategories);

  return { getCategories };
}
