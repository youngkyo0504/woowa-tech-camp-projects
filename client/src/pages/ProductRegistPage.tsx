import { createProduct, updateProduct } from '@apis/product';
import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import { useToast } from '@components/common/CommonToast/ToastContext';
import {
  FormProvider,
  useFormInputMap,
  useFormValidationState,
} from '@components/CustomForm/FormProvider';
import Post from '@components/Post';
import RegionFooter from '@components/Post/RegionFooter';
import { SubmitButton } from '@components/Post/SubmitButton';
import TransitionPage from '@components/TransitionPage';
import { CreateProductAPIDto } from '@customTypes/product';
import useProduct from '@queries/useProduct';
import { useUser } from '@queries/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { getNumber } from '@utils/format';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function ProductRegistPage() {
  return (
    <FormProvider>
      <PostForm />
    </FormProvider>
  );
}

function PostForm() {
  const { user } = useUser();
  const { formInputMap } = useFormInputMap();
  const { isAllValidated } = useFormValidationState();
  const { toastSuccess, toastError } = useToast();
  const { productId } = useParams();
  const isEdit = !!productId;
  const { product: originalProduct } = useProduct(Number(productId));
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const registerProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValidated) {
      toastError(new Error('필수 입력값을 채워주세요'));
      return;
    }

    const product = {
      ...formInputMap,
      price: Number(getNumber(formInputMap.price)),
      regionId: user.regions[0].id,
    } as CreateProductAPIDto;

    try {
      if (isEdit) {
        await updateProduct(product, Number(productId));
        queryClient.invalidateQueries(['product', Number(productId)]);
      } else {
        await createProduct(product);
        queryClient.refetchQueries(['products']);
      }
      toastSuccess('상품 등록이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      navigate('error');
    }
  };

  return (
    <TransitionPage depth={3}>
      <Form onSubmit={registerProduct}>
        <NavigationBar title={isEdit ? '상품 수정' : '상품 등록'} actionItem={<SubmitButton />} />
        <PostPageWrapper>
          <Post product={originalProduct} />
          <RegionFooter />
        </PostPageWrapper>
      </Form>
    </TransitionPage>
  );
}

const PostPageWrapper = styled(PageContainer)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Form = styled.form`
  height: 100%;
`;
