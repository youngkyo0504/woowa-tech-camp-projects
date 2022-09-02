import { SERVER_URL } from '@constants/env';
import axios from 'axios';

const myAxios = axios.create({
  baseURL: SERVER_URL,
});

myAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const {
      response: { status },
      config: originalRequest,
    } = error;

    if (status === 401) {
      try {
        await reissueTokenAndRetryRequest(originalRequest);
      } catch (e) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

async function reissueTokenAndRetryRequest(originalRequest: any) {
  const { data: accessToken } = await axios.get('/auth/resign', {
    withCredentials: true,
  });
  myAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  const retryingRequest = { ...originalRequest };
  retryingRequest.headers.Authorization = `Bearer ${accessToken}`;
  return axios(retryingRequest);
}

export default myAxios;
