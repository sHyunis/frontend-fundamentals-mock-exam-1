export const savingsKeys = {
  all: ['savings'] as const,
  products: () => [...savingsKeys.all, 'products'] as const,
  product: (id: string) => [...savingsKeys.products(), id] as const,
} as const;
