import axios from 'axios';
import { getMenu } from './menuAPI';
import { sendOrder } from './orderAPI';

const initAxios = () => {
  axios.defaults.timeout = 2500;
};

export { getMenu, sendOrder, initAxios };
