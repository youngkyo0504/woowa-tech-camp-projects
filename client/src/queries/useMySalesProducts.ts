import myAxios from '@apis/myAxios';
import { IProductItem } from '@customTypes/product';
import { useQuery } from '@tanstack/react-query';

const getMySalesProducts = async () => {
  try {
    const { data } = await myAxios.get<IProductItem[]>(`/products/sale`);
    return data;
  } catch (e) {
    throw new Error('내 판매 목록을 가져오지 못했습니다.');
  }
};

export const useMySalesProducts = () => useQuery(['mySalesProduct'], getMySalesProducts);
