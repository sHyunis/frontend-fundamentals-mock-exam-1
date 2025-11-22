export const calculateExpectedReturn = (monthlyAmount: number, termMonths: number, annualRate: number): number => {
  return monthlyAmount * termMonths * (1 + annualRate * 0.5);
};

export const calculateDifferenceFromGoal = (goalAmount: number, expectedReturn: number): number => {
  return goalAmount - expectedReturn;
};

export const calculateRecommendedMonthlyAmount = (
  goalAmount: number,
  termMonths: number,
  annualRate: number
): number => {
  const rawAmount = goalAmount / (termMonths * (1 + annualRate * 0.5));
  return Math.round(rawAmount / 1000) * 1000;
};
