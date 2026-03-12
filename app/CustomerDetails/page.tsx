"use client";
import React, { useState } from "react";
import { stlDetailsStore } from "@/store/userDetails";
import PersonalDetailsInput from "../components/PersonalDetailsInput";

const CustomerDetails = () => {
  const weight = stlDetailsStore((s) => s.weight);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuote = () => {
    console.log("Quote requested", form);
  };

  const handleCart = () => {
    console.log("Added to cart", form);
  };

  return (
    <div className="bg-black p-6 rounded-xl border border-amber-400/20 max-w-md w-full mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-yellow-500">
        Get a Quote / Add to Cart
      </h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full bg-black border border-amber-400/40 text-yellow-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="w-full bg-black border border-amber-400/40 text-yellow-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full bg-black border border-amber-400/40 text-yellow-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <textarea
        name="message"
        placeholder="Any message..."
        rows={3}
        onChange={handleChange}
        className="w-full bg-black border border-amber-400/40 text-yellow-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <div className="flex gap-3 pt-2">
        <button
          onClick={handleCart}
          className="flex-1 bg-amber-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={handleQuote}
          className="flex-1 border border-yellow-500 text-yellow-500 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default CustomerDetails;
