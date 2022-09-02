import LoadingIndicator from '@components/common/LoadingIndicator';
import useLogin from '@hooks/useLogin';
import { getQueryValue } from '@utils/queryParser';

export default function OAuthRedirectPage() {
  const code = getQueryValue('code');
  const oAuthOrigin = getQueryValue('origin');
  if (!code || !oAuthOrigin) {
    throw new Error('유효하지 않은 리다이렉션입니다');
  }
  const { login } = useLogin();
  login(code, oAuthOrigin);

  return <LoadingIndicator />;
}
