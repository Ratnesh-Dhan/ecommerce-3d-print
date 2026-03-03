import React from "react";

const CustomInput = ({
  className,
  label,
  value,
  onChange,
}: {
  className: string;
  label: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={`w-72 relative font-sans ${className}`}>
      <label className="text-sm text-gray-500 mb-1 block ml-3">{label}</label>
      <input
        className="text-black w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
