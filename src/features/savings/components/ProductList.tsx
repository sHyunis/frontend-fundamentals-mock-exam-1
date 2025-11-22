import { Checkbox, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../types';
import { formatNumberWithCommas } from '../../../utils/format';

interface ProductListProps {
  products: SavingsProduct[];
  selectedProductId: string | null;
  onSelectProduct: (product: SavingsProduct) => void;
}

export function ProductList({ products, selectedProductId, onSelectProduct }: ProductListProps) {
  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
        <ProductListItem
          key={product.id}
          product={product}
          isSelected={product.id === selectedProductId}
          onSelect={() => onSelectProduct(product)}
        />
      ))}
    </>
  );
}

interface ProductListItemProps {
  product: SavingsProduct;
  isSelected: boolean;
  onSelect: () => void;
}

function ProductListItem({ product, isSelected, onSelect }: ProductListItemProps) {
  const bottomText = `${formatNumberWithCommas(product.minMonthlyAmount)}원 ~ ${formatNumberWithCommas(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`;

  return (
    <ListRow
      onClick={onSelect}
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={product.name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${product.annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={bottomText}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={isSelected ? <Checkbox.Circle checked /> : undefined}
    />
  );
}
