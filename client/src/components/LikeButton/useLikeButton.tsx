import { toggleLike } from '@apis/product';
import { useToast } from '@components/common/CommonToast/ToastContext';
import { IProductItem } from '@customTypes/product';
import useProduct from '@queries/useProduct';
import { useUser } from '@queries/useUser';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

interface UseLikeButtonprops {
  productId: number;
}

export default function useLikeButton({
  productId,
}: UseLikeButtonprops): UseMutateFunction<void, unknown, void, unknown> {
  const queryKey = ['product', productId];
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { toastError } = useToast();
  const { refetchProduct } = useProduct(productId);
  const { mutate } = useMutation(() => toggleLike(productId), {
    onMutate: () => {
      const snapshot = queryClient.getQueryData<IProductItem>(queryKey);
      const optimisticUpdated = optimisticUpdator({
        original: snapshot,
        userId: user.id,
        productId,
      });
      queryClient.setQueryData(queryKey, optimisticUpdated);
      return { snapshot };
    },

    onError: (error, variables, context) => {
      toastError(new Error('찜이 정상 처리되지 않았습니다.'));
      queryClient.setQueryData(queryKey, context?.snapshot);
    },

    onSuccess: () => {
      refetchProduct();
    },
  });

  return mutate;
}

interface OptimisticUpdatorProps {
  original?: IProductItem;
  userId: number;
  productId: number;
}

const optimisticUpdator = ({
  original,
  userId,
  productId,
}: OptimisticUpdatorProps): IProductItem | undefined => {
  if (!original) return undefined;

  const newLikedUsers = [...original.likedUsers];
  const likedLogIndex = original.likedUsers.findIndex((likedUser) => likedUser.userId === userId);
  if (likedLogIndex === -1) {
    newLikedUsers.push({
      userId,
      productId,
    });
  } else {
    newLikedUsers.splice(likedLogIndex, 1);
  }

  return { ...original, likedUsers: newLikedUsers };
};
