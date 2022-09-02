import axios from 'axios';
import { Menu } from '../types/server/menu';

export const getMenu = async (): Promise<Menu[]> => {
  const response = await axios.get('/api/menu');
  return response.data;
};
