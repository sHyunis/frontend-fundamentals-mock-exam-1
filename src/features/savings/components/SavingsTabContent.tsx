import { useState } from 'react';
import styled from '@emotion/styled';
import { useFormContext, useWatch } from 'react-hook-form';
import { Tab } from 'tosslib';
import { ProductList } from './ProductList';
import { CalculationResult } from './CalculationResult';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import type { SavingsProduct } from '../types';
import type { FilterFormValues } from '../schemas/filterSchema';

const TAB = {
  PRODUCTS: 'products',
  RESULTS: 'results',
} as const;

type TabValue = (typeof TAB)[keyof typeof TAB];

interface SavingsTabContentProps {
  isLoading: boolean;
  filteredProducts: SavingsProduct[];
}

export function SavingsTabContent({ isLoading, filteredProducts }: SavingsTabContentProps) {
  const { control } = useFormContext<FilterFormValues>();
  const { goalAmount = 0, monthlyAmount = 0, termMonths = 12 } = useWatch({ control });

  const [activeTab, setActiveTab] = useState<TabValue>(TAB.PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);

  const handleSelectProduct = (product: SavingsProduct) => {
    setSelectedProduct(prev => (prev?.id === product.id ? null : product));
  };

  return (
    <>
      <Tab onChange={(value: string) => setActiveTab(value as TabValue)}>
        <Tab.Item value={TAB.PRODUCTS} selected={activeTab === TAB.PRODUCTS}>
          적금 상품
        </Tab.Item>
        <Tab.Item value={TAB.RESULTS} selected={activeTab === TAB.RESULTS}>
          계산 결과
        </Tab.Item>
      </Tab>

      <ContentArea>
        {isLoading ? (
          <LoadingSpinner />
        ) : activeTab === TAB.PRODUCTS ? (
          <ProductList
            products={filteredProducts}
            selectedProductId={selectedProduct?.id ?? null}
            onSelectProduct={handleSelectProduct}
          />
        ) : (
          <CalculationResult
            selectedProduct={selectedProduct}
            goalAmount={goalAmount}
            monthlyAmount={monthlyAmount}
            termMonths={termMonths}
            filteredProducts={filteredProducts}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </ContentArea>
    </>
  );
}

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
