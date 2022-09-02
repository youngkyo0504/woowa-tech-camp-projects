import axios from 'axios';
import { Order, Receipt } from '../types/server/order';

export const sendOrder = async (order: Order): Promise<Receipt> => {
  const response = await axios.post('/api/order', order);
  return response.data;
};
