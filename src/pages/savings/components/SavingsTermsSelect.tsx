import { SelectBottomSheet } from 'tosslib';

interface SavingsTermsSelectProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function SavingsTermsSelect({ label, value, onChange }: SavingsTermsSelectProps) {
  return (
    <SelectBottomSheet label={label} title="저축 기간을 선택해주세요" value={value} onChange={onChange}>
      <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
      <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
      <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
    </SelectBottomSheet>
  );
}
