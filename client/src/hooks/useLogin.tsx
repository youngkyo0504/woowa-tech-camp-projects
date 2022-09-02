import { useNavigate } from 'react-router-dom';
import { LoginResponseDto } from '@customTypes/user';
import { useQuery } from '@tanstack/react-query';
import { requestLogin, requestResignToken, requestTesterLogin } from '@apis/user';
import myAxios from '@apis/myAxios';

export default function useLogin() {
  const navigate = useNavigate();

  const setAccessTokenOnHeader = (accessToken: string) => {
    myAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const handleLoginResult = (loginResult: LoginResponseDto, error?: unknown) => {
    const { isRegistered, oAuthInfo, accessToken } = loginResult;
    if (!isRegistered) {
      window.location.href = `/signUp?oAuthId=${oAuthInfo?.oAuthId}&origin=${oAuthInfo?.oAuthOrigin}`;
    }

    if (isRegistered && accessToken) {
      setAccessTokenOnHeader(accessToken);
      window.location.href = '/';
    }

    if (error) {
      navigate('/error');
    }
  };

  const login = async (code: string, oAuthOrigin: string) => {
    const { data: loginResult, error } = useQuery<LoginResponseDto>(['login'], () =>
      requestLogin(code, oAuthOrigin),
    );
    if (!loginResult) return;
    handleLoginResult(loginResult, error);
  };

  const testerLogin = async () => {
    const loginResult = await requestTesterLogin();
    if (!loginResult) return;
    handleLoginResult(loginResult);
  };

  const relogin = async () => {
    const accessToken = await requestResignToken();
    setAccessTokenOnHeader(accessToken);
    navigate('/');
  };

  return { login, relogin, testerLogin };
}
