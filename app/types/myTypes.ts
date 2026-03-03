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
