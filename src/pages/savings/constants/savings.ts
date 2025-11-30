export const SAVING_TABS = {
  products: 'products',
  results: 'results',
} as const;

export type SavingTabsType = (typeof SAVING_TABS)[keyof typeof SAVING_TABS];
