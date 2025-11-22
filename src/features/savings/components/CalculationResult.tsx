import styled from '@emotion/styled';
import { Border, Checkbox, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import type { SavingsProduct } from '../types';
import { formatNumberWithCommas } from '../../../utils/format';
import { getTopProductsByRate } from '../utils/filter';

interface CalculationResultProps {
  selectedProduct: SavingsProduct | null;
  goalAmount: number;
  monthlyAmount: number;
  termMonths: number;
  filteredProducts: SavingsProduct[];
  onSelectProduct: (product: SavingsProduct) => void;
}

export function CalculationResult({
  selectedProduct,
  goalAmount,
  monthlyAmount,
  termMonths,
  filteredProducts,
  onSelectProduct,
}: CalculationResultProps) {
  const topProducts = getTopProductsByRate(filteredProducts, 2);

  if (!selectedProduct) {
    return (
      <>
        <EmptyMessage>상품을 선택해주세요.</EmptyMessage>
        <Spacing size={8} />
        <Border height={16} />
        <Spacing size={8} />
        <RecommendedProducts products={topProducts} selectedProductId={null} onSelectProduct={onSelectProduct} />
      </>
    );
  }

  const annualRate = selectedProduct.annualRate / 100;
  const expectedAmount = monthlyAmount * termMonths * (1 + annualRate * 0.5);
  const difference = goalAmount - expectedAmount;
  const recommendedMonthly = Math.round(goalAmount / (termMonths * (1 + annualRate * 0.5)) / 1000) * 1000;

  return (
    <>
      <Spacing size={8} />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumberWithCommas(Math.round(expectedAmount))}원`}
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
            bottom={`${difference >= 0 ? '-' : '+'}${formatNumberWithCommas(Math.abs(Math.round(difference)))}원`}
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
            bottom={`${formatNumberWithCommas(recommendedMonthly)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <RecommendedProducts
        products={topProducts}
        selectedProductId={selectedProduct.id}
        onSelectProduct={onSelectProduct}
      />
    </>
  );
}

interface RecommendedProductsProps {
  products: SavingsProduct[];
  selectedProductId: string | null;
  onSelectProduct: (product: SavingsProduct) => void;
}

function RecommendedProducts({ products, selectedProductId, onSelectProduct }: RecommendedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      {products.map(product => (
        <RecommendedProductItem
          key={product.id}
          product={product}
          isSelected={product.id === selectedProductId}
          onSelect={() => onSelectProduct(product)}
        />
      ))}
      <Spacing size={40} />
    </>
  );
}

interface RecommendedProductItemProps {
  product: SavingsProduct;
  isSelected: boolean;
  onSelect: () => void;
}

function RecommendedProductItem({ product, isSelected, onSelect }: RecommendedProductItemProps) {
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
      right={isSelected && <Checkbox.Circle checked readOnly />}
    />
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
