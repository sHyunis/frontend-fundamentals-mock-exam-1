import type { SavingsProduct } from '../types';

interface FilterCriteria {
  monthlyAmount: number;
  termMonths: number;
}

export const filterProducts = (products: SavingsProduct[], criteria: FilterCriteria): SavingsProduct[] => {
  const { monthlyAmount, termMonths } = criteria;

  return products.filter(product => {
    const isWithinMonthlyAmountRange =
      monthlyAmount > product.minMonthlyAmount && monthlyAmount < product.maxMonthlyAmount;
    const isMatchingAvailableTerms = product.availableTerms === termMonths;

    return isWithinMonthlyAmountRange && isMatchingAvailableTerms;
  });
};

export const getTopProductsByRate = (products: SavingsProduct[], count: number): SavingsProduct[] => {
  return [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, count);
};
