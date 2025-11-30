import styled from '@emotion/styled';
import { colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../types';

interface CalculationResultProps {
  selectedProduct: SavingsProduct | null;
  goalAmount: number;
  monthlyAmount: number;
  termMonths: number;
}

export function CalculationResult({ selectedProduct, goalAmount, monthlyAmount, termMonths }: CalculationResultProps) {
  if (!selectedProduct) {
    return <EmptyMessage>상품을 선택해주세요.</EmptyMessage>;
  }

  const annualRate = selectedProduct.annualRate;
  const expectedAmount = Math.round(monthlyAmount * termMonths * (1 + annualRate * 0.5));
  const difference = goalAmount - expectedAmount;
  const recommendedMonthly = Math.round(goalAmount / (termMonths * (1 + annualRate * 0.5)) / 1000) * 1000;

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${expectedAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${difference >= 0 ? '-' : '+'}${Math.abs(difference).toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthly.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
}

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  color: ${colors.grey600};
  font-size: 16px;
`;
