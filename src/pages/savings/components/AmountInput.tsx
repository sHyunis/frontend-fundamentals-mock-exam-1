import { ChangeEvent } from 'react';
import { TextField } from 'tosslib';

interface AmountInputProps {
  label: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
}

export function AmountInput({ label, placeholder, value, onChange }: AmountInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value.replace(/,/g, ''));
    onChange(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      suffix="원"
      value={value > 0 ? value.toLocaleString() : ''}
      onChange={handleChange}
    />
  );
}
