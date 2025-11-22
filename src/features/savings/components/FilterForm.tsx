import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { formatNumberWithCommas, parseNumericString } from '../../../utils/format';

interface FilterFormProps {
  goalAmount: number;
  monthlyAmount: number;
  termMonths: number;
  onGoalAmountChange: (value: number) => void;
  onMonthlyAmountChange: (value: number) => void;
  onTermMonthsChange: (value: number) => void;
}

export function FilterForm({
  goalAmount,
  monthlyAmount,
  termMonths,
  onGoalAmountChange,
  onMonthlyAmountChange,
  onTermMonthsChange,
}: FilterFormProps) {
  const formatInputValue = (amount: number): string => {
    return amount > 0 ? formatNumberWithCommas(amount) : '';
  };

  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formatInputValue(goalAmount)}
        onChange={e => onGoalAmountChange(parseNumericString(e.target.value))}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formatInputValue(monthlyAmount)}
        onChange={e => onMonthlyAmountChange(parseNumericString(e.target.value))}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={termMonths}
        onChange={onTermMonthsChange}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}
