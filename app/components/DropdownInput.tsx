"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { CoolSelectProps } from "../types/myTypes";

export default function DropdownInput({
  className,
  label = "Select option",
  options = [],
  value,
  onChange,
}: CoolSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current?.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={`w-72 relative font-sans ${className}`} ref={ref}>
      <label className="text-sm text-gray-500 mb-1 block ml-3">{label}</label>

      {/* Input Box */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
      >
        <span className={`${selected ? "text-black" : "text-gray-400"}`}>
          {selected?.label || "Choose..."}
        </span>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left text-blue-500 hover:bg-gray-100 transition ${
                    value === opt.value ? "bg-gray-100" : ""
                  }`}
                >
                  {opt.label}
                  {value === opt.value && <Check size={16} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------
// Example usage
// -----------------------------

/*
import CoolSelect from "./CoolSelect";
import { useState } from "react";

export default function App() {
  const [val, setVal] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <CoolSelect
        label="Category"
        value={val}
        onChange={setVal}
        options={[
          { label: "3D Printing", value: "3d" },
          { label: "Electronics", value: "elec" },
          { label: "Tools", value: "tools" },
          { label: "Accessories", value: "acc" },
        ]}
      />
    </div>
  );
}
*/
