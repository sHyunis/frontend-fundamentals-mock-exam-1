import { http } from 'tosslib';
import type { SavingsProduct } from '../types';

export const getSavingsProducts = async (): Promise<SavingsProduct[]> => {
  return http.get<SavingsProduct[]>('/api/savings-products');
};
