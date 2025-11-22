export const formatNumberWithCommas = (amount: number): string => {
  return amount.toLocaleString('ko-KR');
};

export const parseNumericString = (value: string): number => {
  const cleaned = value.replace(/[^\d]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
};
