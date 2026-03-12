import React from "react";
export default function PersonalDetailsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full
        px-4 py-2
        rounded-lg
        bg-black
        border border-amber-400/40
        text-yellow-400
        placeholder-yellow-500/40
        outline-none
        transition-all duration-200
        focus:border-yellow-500
        focus:ring-2 focus:ring-yellow-500/50
        focus:shadow-[0_0_10px_rgba(234,179,8,0.6)]
      "
    />
  );
}
