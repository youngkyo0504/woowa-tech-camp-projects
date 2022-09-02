import { updateProduct } from '@apis/product';
import { SalesStatusType } from '@customTypes/product';
import { useMutation, UseMutateFunction, useQueryClient } from '@tanstack/react-query';

export default function useSalesStatusSelector(
  productId: number,
): UseMutateFunction<void, unknown, SalesStatusType, unknown> {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (newSalesStatus: SalesStatusType) => updateProduct({ salesStatus: newSalesStatus }, productId),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(['product', String(productId)]);
      },
    },
  );

  return mutate;
}
