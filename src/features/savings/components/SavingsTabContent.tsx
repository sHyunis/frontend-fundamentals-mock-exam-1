import { useState } from 'react';
import styled from '@emotion/styled';
import { Tab } from 'tosslib';
import { ProductList } from './ProductList';
import { CalculationResult } from './CalculationResult';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import type { SavingsProduct } from '../types';

const TAB = {
  PRODUCTS: 'products',
  RESULTS: 'results',
} as const;

type TabValue = (typeof TAB)[keyof typeof TAB];

interface SavingsTabContentProps {
  isLoading: boolean;
  filteredProducts: SavingsProduct[];
  goalAmount: number;
  monthlyAmount: number;
  termMonths: number;
}

export function SavingsTabContent({
  isLoading,
  filteredProducts,
  goalAmount,
  monthlyAmount,
  termMonths,
}: SavingsTabContentProps) {
  const [activeTab, setActiveTab] = useState<TabValue>(TAB.PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);

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
            onSelectProduct={setSelectedProduct}
          />
        ) : (
          <CalculationResult
            selectedProduct={selectedProduct}
            goalAmount={goalAmount}
            monthlyAmount={monthlyAmount}
            termMonths={termMonths}
            filteredProducts={filteredProducts}
            onSelectProduct={setSelectedProduct}
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
