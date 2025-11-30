import { useState } from 'react';

export function useSavingsStates() {
  const [goalAmount, setGoalAmount] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [savingsTerms, setSavingsTerms] = useState(12);

  const setSavingsParams = (params: Partial<{ goalAmount: number; monthlyAmount: number; savingsTerms: number }>) => {
    if (params.goalAmount !== undefined) {
      setGoalAmount(params.goalAmount);
    }
    if (params.monthlyAmount !== undefined) {
      setMonthlyAmount(params.monthlyAmount);
    }
    if (params.savingsTerms !== undefined) {
      setSavingsTerms(params.savingsTerms);
    }
  };

  return {
    state: { goalAmount, monthlyAmount, savingsTerms },
    setSavingsParams,
  };
}
