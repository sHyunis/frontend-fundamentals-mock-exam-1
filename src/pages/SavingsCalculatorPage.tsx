import { useState } from 'react';
import styled from '@emotion/styled';
import { Border, colors, ListRow, Spacing, Tab } from 'tosslib';
import { useSavingsProducts } from '../features/savings/hooks/useSavingsProducts';
import { filterProducts } from '../features/savings/utils/filter';
import { Header } from '../features/savings/components/Header';
import { FilterForm } from '../features/savings/components/FilterForm';
import { ProductList } from '../features/savings/components/ProductList';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';

export function SavingsCalculatorPage() {
  const { data: savingsProducts = [], isLoading, error } = useSavingsProducts();

  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  const [termMonths, setTermMonths] = useState<number>(12);

  const filteredProducts =
    monthlyAmount <= 0
      ? savingsProducts.filter(product => product.availableTerms === termMonths)
      : filterProducts(savingsProducts, { monthlyAmount, termMonths });

  if (error) {
    return (
      <>
        <Header />
        <ListRow
          contents={
            <ListRow.Texts
              type="1RowTypeA"
              top="상품 목록을 불러오는 중 오류가 발생했습니다."
              topProps={{ color: colors.red500 }}
            />
          }
        />
      </>
    );
  }

  return (
    <PageContainer>
      <Header />

      <FilterForm
        goalAmount={goalAmount}
        monthlyAmount={monthlyAmount}
        termMonths={termMonths}
        onGoalAmountChange={setGoalAmount}
        onMonthlyAmountChange={setMonthlyAmount}
        onTermMonthsChange={setTermMonths}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={() => {}}>
        <Tab.Item value="products" selected={true}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={false}>
          계산 결과
        </Tab.Item>
      </Tab>

      <ContentArea>{isLoading ? <LoadingSpinner /> : <ProductList products={filteredProducts} />}</ContentArea>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
