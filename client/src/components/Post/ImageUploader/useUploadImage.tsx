import { uploadProductImage } from '@apis/imageUpload';
import { useForm } from '@components/CustomForm/useForm';
import { FormEvent } from 'react';

export const MAX_QUANTITY_IMG_URLS = 2;

export const useUploadImage = (thumbnails?: string[]) => {
  const initialValue = thumbnails || [];
  const validator = {
    min: {
      validate: (value: string[]) => value.length > 0,
      errorMessage: '사진을 등록해주세요',
    },
    max: {
      validate: (value: string[]) => value.length <= MAX_QUANTITY_IMG_URLS,
      errorMessage: `사진은 ${MAX_QUANTITY_IMG_URLS}개 이하로 해주세요`,
    },
  };

  const {
    setInputValue: setUploadedImgUrls,
    inputValue: uploadedImgUrls,
    errorMessage,
    validate,
  } = useForm<string[], { min: () => boolean; max: () => boolean }>(
    'thumbnails',
    initialValue,
    validator,
    { isInitialValid: !!thumbnails },
  );
  // const [uploadedImgUrls, setUploadedImgUrls] = useState<string[]>([]);

  const deleteImageFile = (imgUrl: string) => {
    const newUploadedImageFiles = uploadedImgUrls.filter(
      (uploadedImgUrl) => uploadedImgUrl !== imgUrl,
    );
    setUploadedImgUrls(newUploadedImageFiles);
  };

  const addImageFile = (imgUrl: string) => {
    setUploadedImgUrls([...uploadedImgUrls, imgUrl]);
  };

  const imageUpload = async (e: FormEvent<HTMLInputElement>) => {
    const imageFiles = e.currentTarget.files;
    if (imageFiles && imageFiles.length > 0) {
      const imageFile = imageFiles[0];

      if (
        !validate({
          value: [...uploadedImgUrls, imageFile.name],
          canChangeValidState: false,
        })
      ) {
        e.preventDefault();
        return;
      }
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgUrl = await uploadProductImage(formData);
      addImageFile(imgUrl);
    }
  };

  const actions = { deleteImageFile, imageUpload, addImageFile };
  return { uploadedImgUrls, actions, errorMessage };
};
