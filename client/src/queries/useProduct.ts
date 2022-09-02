import { requestDeleteProduct, requestProductDetail } from '@apis/product';
import { useToast } from '@components/common/CommonToast/ToastContext';
import { IProduct } from '@customTypes/product';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useProduct(productId?: number) {
  const { data: product, refetch: refetchProduct } = useQuery<IProduct>(
    ['product', productId],
    () => requestProductDetail(Number(productId)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  return { product, refetchProduct };
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();
  const { mutate: deleteProduct } = useMutation(
    (productId: number) => requestDeleteProduct(productId),
    {
      onSuccess: (productId) => {
        // todo: 로직 개선
        queryClient.refetchQueries(['products']);
        queryClient.removeQueries(['product', productId]);
        toastSuccess('상품이 삭제되었습니다.');
      },
      onError: () => {
        toastError(new Error('삭제를 실패했습니다.'));
      },
    },
  );
  return { deleteProduct };
}
