import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingSpinner } from 'shared/components/LoadingSpinner';
import { Assets, colors, ListRow } from 'tosslib';
import { getSavingsProductsQueryOptions } from '../hooks/useSavingsProductsQueryOptions';
import type { FilterSavingsProduct, OrderBySavingsProduct } from '../utils/filter';

interface ProductListProps {
  filters?: FilterSavingsProduct[];
  limit?: number;
  orderBy?: OrderBySavingsProduct;
  selectedProductId: string | null;
  onSelectProductId: (productId: string) => void;
}

export function ProductList({ filters, limit, orderBy, selectedProductId, onSelectProductId }: ProductListProps) {
  const { data: products = [] } = useSuspenseQuery(getSavingsProductsQueryOptions({ filters, limit, orderBy }));

  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
        <ListRow
          key={product.id}
          onClick={() => onSelectProductId(product.id)}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={
            <CheckboxWrapper isVisible={product.id === selectedProductId}>
              <Assets.Icon name="icon-check-circle-green" />
            </CheckboxWrapper>
          }
        />
      ))}
    </>
  );
}

const CheckboxWrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'scale(1)' : 'scale(0.8)')};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`;

ProductList.Loading = function ProductListLoading() {
  return <LoadingSpinner />;
};
