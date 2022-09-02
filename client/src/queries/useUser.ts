import { useToast } from '@components/common/CommonToast/ToastContext';
import { IUser } from '@customTypes/user';
import { requestUser, requestLogout } from '@apis/user';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const initialUser = {
  id: -1,
  name: '',
  regions: [{ id: -1, address: '', isPrimary: true }],
};

export function useUser() {
  const { data: user = initialUser, refetch: refetchUser } = useQuery<IUser>(
    ['user'],
    requestUser,
    {
      staleTime: 30000,
      placeholderData: initialUser,
    },
  );

  return { user, refetchUser };
}

export const useLogOut = () => {
  const queryClinet = useQueryClient();
  const { toastSuccess, toastError } = useToast();
  const { mutate } = useMutation(requestLogout, {
    onSuccess: () => {
      queryClinet.setQueryData(['user'], initialUser);
      toastSuccess('로그아웃 되었습니다.');
    },
    onError: () => {
      toastError(new Error('로그아웃에 실패했습니다.'));
    },
  });

  return mutate;
};
