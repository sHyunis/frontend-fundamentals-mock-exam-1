import { queryOptions } from '@tanstack/react-query';
import { getSavingsProducts } from '../api/getSavingsProducts';
import type { FilterSavingsProduct, OrderBySavingsProduct } from '../utils/filter';

interface Options {
  filters?: FilterSavingsProduct[];
  orderBy?: OrderBySavingsProduct | null;
  limit?: number;
}

export function getSavingsProductsQueryOptions({ filters, orderBy, limit }: Options) {
  return queryOptions({
    queryKey: ['savings-products'] as const,
    queryFn: () => getSavingsProducts(),
    select: (data: Awaited<ReturnType<typeof getSavingsProducts>>) => {
      const filteredData = data.filter(x => filters?.every(filter => filter(x)) ?? true);

      if (orderBy != null) {
        return filteredData.sort(orderBy).slice(0, limit);
      }

      return filteredData.slice(0, limit);
    },
  });
}
