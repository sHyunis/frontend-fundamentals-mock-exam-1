import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { colors, ListRow } from 'tosslib';
import { getSavingsProductsQueryOptions } from '../hooks/useSavingsProductsQueryOptions';
import { useSavingsStates } from '../hooks/useSavingsStates';

interface CalculationResultProps {
  selectedProductId: string | null;
}

export function CalculationResult({ selectedProductId }: CalculationResultProps) {
  const { state } = useSavingsStates();
  const { goalAmount, monthlyAmount, savingsTerms } = state;

  const { data } = useSuspenseQuery(
    getSavingsProductsQueryOptions({
      filters: selectedProductId ? [x => x.id === selectedProductId] : undefined,
    })
  );

  if (!selectedProductId) {
    return <EmptyMessage>상품을 선택해주세요.</EmptyMessage>;
  }

  const savingProduct = data[0];

  if (savingProduct == null) {
    return <EmptyMessage>상품을 선택해주세요.</EmptyMessage>;
  }

  if (goalAmount == null || goalAmount === 0) {
    return <EmptyMessage>목표 금액을 입력해주세요.</EmptyMessage>;
  }

  const annualRate = savingProduct.annualRate / 100;
  const expectedAmount = Math.round(monthlyAmount * savingsTerms * (1 + annualRate * 0.5));
  const difference = goalAmount - expectedAmount;
  const recommendedMonthly = Math.round(goalAmount / (savingsTerms * (1 + annualRate * 0.5)) / 1000) * 1000;

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
