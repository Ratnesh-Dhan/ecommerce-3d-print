"use client";
import React, { useState } from "react";
import DropdownInput from "../components/DropdownInput";
import CustomInput from "../components/CustomInput";

const Stl = () => {
  const [weight, setWeight] = useState<number | string>("");
  const [material, setMaterial] = useState<string | number>("");
  const [infill, setInfill] = useState<string | number>("");
  const [shipping, setShipping] = useState<string | number>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setWeight("");
      return;
    }
    setWeight(Number(value));
  };
  return (
    <div className="p-20">
      <h2 className="text-2xl text-center mb-8">Upload & Get Instant Quote</h2>
      <div className="flex gap-10">
        <div className="w-100 text-center">
          <div className="border h-100 w-100" />
          <button className="p-2 bg-[#a88d32] w-full font-bold text-black text-xl">
            UPLOAD MODEL
          </button>
        </div>
        <div className="">
          <h3 className="text-xl font-bold text-center mb-4">
            Pricing Calculator
          </h3>

          <CustomInput
            className="mb-4"
            label="Weight"
            value={weight}
            onChange={handleWeightChange}
          />
          <DropdownInput
            className="mb-4"
            label="Material"
            value={material}
            onChange={(value) => setMaterial(value)}
            options={[
              { label: "PLA (₹10/g)", value: 1 },
              { label: "ABS (₹15/g)", value: 2 },
              { label: "TPU (₹25/g)", value: 3 },
              { label: "PETG (₹40/g)", value: 4 },
            ]}
          />
          <DropdownInput
            className="mb-4"
            label="Infill %"
            value={infill}
            onChange={(value) => setInfill(value)}
            options={[
              { label: "10%", value: 1 },
              { label: "25%", value: 2 },
              { label: "50%", value: 3 },
              { label: "75%", value: 4 },
              { label: "100%", value: 5 },
            ]}
          />
          <CustomInput
            className="mb-4"
            label="Quantity"
            value={quantity}
            onChange={(value) => setQuantity(value)}
          />
          <DropdownInput
            className="mb-4"
            label="Shipping"
            value={shipping}
            onChange={(value) => setShipping(value)}
            options={[
              { label: "Standard (5-7 days)", value: 1 },
              { label: "Express (2-3 days) +50%", value: 2 },
              { label: "Same Day (1-2 days) +100%", value: 3 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Stl;
