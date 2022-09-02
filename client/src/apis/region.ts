import myAxios from '@apis/myAxios';

export async function searchRegionByKeyword(keyword: string) {
  if (keyword === '') return [];
  try {
    const { data } = await myAxios.get(`/region/search?keyword=${keyword}`);
    return data.regions;
  } catch (e) {
    throw new Error('검색에 실패했습니다.');
  }
}
