"use client";
import React, { useState, useEffect } from "react";
import DropdownInput from "../components/DropdownInput";
import CustomInput from "../components/CustomInput";
import ColorSelector from "./ColorSelector";

const Stl = () => {
  const [weight, setWeight] = useState<number | string>("");
  const [material, setMaterial] = useState<string | number>("");
  const [infill, setInfill] = useState<string | number>("");
  const [shipping, setShipping] = useState<string | number>("");
  const [quantity, setQuantity] = useState<number | string>(1);
  const [color, setColor] = useState<string | number>("");
  const [materialCost, setMaterialCost] = useState(0);
  const [infillCost, setInfillCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setQuantity(1);
      return;
    }
    if (!Number.isInteger(Number(value))) return;
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    if (!Number.isInteger(Number(value))) return;
    if (Number.parseInt(value, 10) < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(Number.parseInt(value, 10));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setWeight("");
      return;
    }
    setWeight(Number(value));
  };


  const calculatePrice = () => {
    if (!weight || !material) return;
  
    let materialRate = 0;
  
    if (material === 1) materialRate = 10;
    if (material === 2) materialRate = 15;
    if (material === 3) materialRate = 25;
    if (material === 4) materialRate = 40;
  
    const baseMaterialCost = Number(weight) * materialRate;
  
    const infillMultiplier = {
      1: 0,
      2: 0.10,
      3: 0.25,
      4: 0.40,
      5: 0.60,
    };
  
    const infillAdjustment =
     baseMaterialCost * (infillMultiplier[infill as number] || 0);
  
    const shippingMultiplier = {
      1: 0,
      2: 50,
      3: 100,
    };
  
    const shippingValue =
      shippingMultiplier[shipping as number] || 0;
  
      const total =
      (baseMaterialCost + infillAdjustment + shippingValue) *      Number(quantity || 1);
  
    setMaterialCost(baseMaterialCost);
    setInfillCost(infillAdjustment);
    setDeliveryCost(shippingValue);
    setTotalPrice(total);
  }; 

  useEffect(() => {
    calculatePrice();
  }, [weight, material, infill, quantity, shipping]); 

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
        <div className="border border-yellow-500 rounded-xl p-6 w-[420px] bg-[#111]">
          <h3 className="text-xl font-bold text-center mb-4 flex flex-col gap-4">
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
          <ColorSelector value={color} onChange={(value) => setColor(value)} />
          <CustomInput
            className="mb-4"
            label="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
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

<div className="mt-6 border border-yellow-500 rounded-xl p-5 w-80">
  <h3 className="text-yellow-400 font-bold text-center mb-4">
    Price Breakdown
  </h3>

  <div className="flex justify-between text-sm mb-2">
    <span>Material Cost:</span>
    <span>₹{materialCost}</span>
  </div>

  <div className="flex justify-between text-sm mb-2">
    <span>Infill Adjustment:</span>
    <span>₹{infillCost}</span>
  </div>

  <div className="flex justify-between text-sm mb-2">
    <span>Quantity Multiplier:</span>
    <span>x{quantity}</span>
  </div>

  <div className="flex justify-between text-sm mb-2">
    <span>Delivery:</span>
    <span>₹{deliveryCost}</span>
  </div>

  <hr className="my-3 border-yellow-500" />

  <div className="flex justify-between font-bold text-lg">
    <span>TOTAL:</span>
    <span>₹{totalPrice}</span>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Stl;
