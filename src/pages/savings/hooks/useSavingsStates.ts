import { useState } from 'react';
import { SavingsState } from '../types';

export function useSavingsStates() {
  const [goalAmount, setGoalAmount] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [savingsTerms, setSavingsTerms] = useState(12);

  const setSavingsParams = (params: Partial<SavingsState>) => {
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
