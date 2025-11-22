import styled from '@emotion/styled';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Border, colors, ListRow, Spacing } from 'tosslib';
import { useSavingsProducts } from '../features/savings/hooks/useSavingsProducts';
import { filterProducts } from '../features/savings/utils/filter';
import { Header } from '../features/savings/components/Header';
import { FilterForm } from '../features/savings/components/FilterForm';
import { SavingsTabContent } from '../features/savings/components/SavingsTabContent';
import { filterSchema, type FilterFormValues } from '../features/savings/schemas/filterSchema';

export function SavingsCalculatorPage() {
  const { data: savingsProducts = [], isLoading, error } = useSavingsProducts();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      goalAmount: 0,
      monthlyAmount: 0,
      termMonths: 12,
    },
  });

  const { monthlyAmount = 0, termMonths = 12 } = useWatch({ control: form.control });

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
    <FormProvider {...form}>
      <PageContainer>
        <Header />

        <FilterForm />

        <Spacing size={24} />
        <Border height={16} />
        <Spacing size={8} />

        <SavingsTabContent isLoading={isLoading} filteredProducts={filteredProducts} />
      </PageContainer>
    </FormProvider>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
