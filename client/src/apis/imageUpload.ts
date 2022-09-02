import axios from 'axios';

export async function uploadProductImage(formData: FormData) {
  try {
    const res = await axios.post<{ imgUrl: string }>('/upload-image/product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const { imgUrl } = res.data;
    return imgUrl;
  } catch (err) {
    throw new Error('이미지 업로드를 실패했습니다');
  }
}
