import myAxios from '@apis/myAxios';
import { IProductItem } from '@customTypes/product';
import { useQuery } from '@tanstack/react-query';

const getLikedProducts = async () => {
  try {
    const { data } = await myAxios.get<IProductItem[]>(`/products/liked`);
    return data;
  } catch (e) {
    throw new Error('찜 목록을 가져오지 못했습니다.');
  }
};

export const useLikedProducts = () => useQuery(['myLikedProducts'], getLikedProducts);
