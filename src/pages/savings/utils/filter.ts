import type { SavingsProduct } from '../types';

export type FilterSavingsProduct = (product: SavingsProduct) => boolean;
export type OrderBySavingsProduct = (a: SavingsProduct, b: SavingsProduct) => number;

export const filterByMonthlyAmount = (product: SavingsProduct, monthlyAmount: number): boolean => {
  if (monthlyAmount <= 0) {
    return true;
  }
  return monthlyAmount >= product.minMonthlyAmount && monthlyAmount <= product.maxMonthlyAmount;
};

export const filterBySavingsTerms = (product: SavingsProduct, termMonths: number): boolean => {
  return product.availableTerms === termMonths;
};

export const orderByAnnualRate: OrderBySavingsProduct = (a, b) => {
  return b.annualRate - a.annualRate;
};
