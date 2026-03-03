export interface SelectOption {
  label: string;
  value: string | number;
}

export interface CoolSelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
}

export interface CustomInputProps {
  className: string;
  label: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ColorSelectorProps {
  value: string | number;
  onChange: (value: string | number) => void;
}
