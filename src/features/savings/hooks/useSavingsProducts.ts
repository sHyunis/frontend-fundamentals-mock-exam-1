import { useQuery } from '@tanstack/react-query';
import { savingsKeys } from '../api/keys';
import { getSavingsProducts } from '../api/getSavingsProducts';

export const useSavingsProducts = () => {
  return useQuery({
    queryKey: savingsKeys.products(),
    queryFn: getSavingsProducts,
  });
};
