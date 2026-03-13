"use client";
import React, { useState } from "react";
import { ColorSelectorProps } from "../types/myTypes";

const ColorSelector = ({ value, onChange }: ColorSelectorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const colors = [
    { label: "Black", value: "black", color: "#000000" },
    { label: "White", value: "white", color: "#FFFFFF" },
    { label: "Red", value: "red", color: "#FF0000" },
    { label: "Blue", value: "blue", color: "#0000FF" },
    { label: "Green", value: "green", color: "#00FF00" },
  ];

  return (
    <div className="mb-4">
      <div className=" items-center justify-between w-72">
        <span className="text-sm text-gray-500 ml-3 font-bold">
          Select Color
        </span>
        <button
          className=" text-gray-500 mb-1 block py-3 px-4 bg-white flex w-full justify-between rounded-2xl"
          onClick={() => setOpen(!open)}
        >
          Selected color :
          <div className="flex gap-5">
            <p className="font-bold">{label}</p>
            <div
              className="w-5 h-5 rounded-xs border border-gray-300"
              style={{ backgroundColor: value as string }}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="absolute mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 grid grid-cols-2 gap-2">
          {colors.map((color, idx) => (
            <button
              className="w-30 flex items-center justify-between px-4 py-3 text-left text-blue-500 hover:bg-gray-100 transition"
              key={idx}
              onClick={() => {
                onChange(color.value);
                setLabel(color.label);
                setOpen(!open);
              }}
            >
              {color.label}
              {"  •  "}
              <div
                className="w-5 h-5 rounded-xs border border-gray-300"
                style={{ backgroundColor: color.color }}
              />
            </button>
          ))}
        </div>
      )}
      {/* <select
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select> */}
    </div>
  );
};

export default ColorSelector;
