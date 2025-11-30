import styled from '@emotion/styled';
import { Suspense, useState } from 'react';
import { Border, ListHeader, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { match } from 'ts-pattern';
import { AmountInput } from './components/AmountInput';
import { CalculationResult } from './components/CalculationResult';
import { ProductList } from './components/ProductList';
import { SavingsTermsSelect } from './components/SavingsTermsSelect';
import { SAVING_TABS, SavingTabsType } from './constants/savings';
import { useSavingsStates } from './hooks/useSavingsStates';
import { filterByMonthlyAmount, filterBySavingsTerms, orderByAnnualRate } from './utils/filter';

export function SavingsCalculatorPage() {
  const [view, setView] = useState<SavingTabsType>(SAVING_TABS.products);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const {
    state: { goalAmount, monthlyAmount, savingsTerms },
    setSavingsParams,
  } = useSavingsStates();

  return (
    <PageContainer>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />

      <AmountInput
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        value={goalAmount}
        onChange={value => setSavingsParams({ goalAmount: value })}
      />
      <Spacing size={16} />
      <AmountInput
        label="월 납입액"
        placeholder="월 납입액을 입력하세요"
        value={monthlyAmount}
        onChange={value => setSavingsParams({ monthlyAmount: value })}
      />
      <Spacing size={16} />
      <SavingsTermsSelect
        label="저축 기간"
        value={savingsTerms}
        onChange={value => setSavingsParams({ savingsTerms: value })}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={(value: string) => setView(value as SavingTabsType)}>
        <Tab.Item value={SAVING_TABS.products} selected={view === SAVING_TABS.products}>
          적금 상품
        </Tab.Item>
        <Tab.Item value={SAVING_TABS.results} selected={view === SAVING_TABS.results}>
          계산 결과
        </Tab.Item>
      </Tab>

      {match(view)
        .with(SAVING_TABS.products, () => (
          <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 불러오는 중..." />} />}>
            <ProductList
              filters={[x => filterByMonthlyAmount(x, monthlyAmount), x => filterBySavingsTerms(x, savingsTerms)]}
              selectedProductId={selectedProductId}
              onSelectProductId={setSelectedProductId}
            />
          </Suspense>
        ))
        .with(SAVING_TABS.results, () => (
          <>
            <Spacing size={8} />
            <CalculationResult selectedProductId={selectedProductId} />
            <Spacing size={8} />
            <Border height={16} />
            <Spacing size={8} />
            <ListHeader
              title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>}
            />
            <Spacing size={12} />
            <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 불러오는 중..." />} />}>
              <ProductList
                filters={[x => filterByMonthlyAmount(x, monthlyAmount), x => filterBySavingsTerms(x, savingsTerms)]}
                orderBy={orderByAnnualRate}
                limit={2}
                selectedProductId={selectedProductId}
                onSelectProductId={setSelectedProductId}
              />
            </Suspense>
          </>
        ))
        .exhaustive()}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
