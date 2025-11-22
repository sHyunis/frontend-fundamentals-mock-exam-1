import { colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../types';
import { formatNumberWithCommas } from '../../../utils/format';

interface ProductListProps {
  products: SavingsProduct[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </>
  );
}

interface ProductListItemProps {
  product: SavingsProduct;
}

function ProductListItem({ product }: ProductListItemProps) {
  const bottomText = `${formatNumberWithCommas(product.minMonthlyAmount)}원 ~ ${formatNumberWithCommas(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`;

  return (
    <ListRow
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
    />
  );
}
