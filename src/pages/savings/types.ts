export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export interface SavingsState {
  goalAmount: number;
  monthlyAmount: number;
  savingsTerms: number;
}
