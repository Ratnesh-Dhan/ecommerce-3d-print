// WhyChooseUs.tsx - Icons and features section
"use client";

import { motion } from "framer-motion";
import { Cpu, Clock, Shield, Settings, DollarSign, HelpCircle } from "lucide-react";

const features = [
  { icon: <Clock size={32} className="text-[#F5B301]" />, label: "Fast Delivery" },
  { icon: <Cpu size={32} className="text-[#F5B301]" />, label: "Precision Printing" },
  { icon: <Settings size={32} className="text-[#F5B301]" />, label: "Premium Materials" },
  { icon: <Shield size={32} className="text-[#F5B301]" />, label: "Secure Packaging" },
  { icon: <DollarSign size={32} className="text-[#F5B301]" />, label: "Affordable Pricing" },
  { icon: <HelpCircle size={32} className="text-[#F5B301]" />, label: "Expert Support" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              {item.icon}
              <p className="mt-4 text-lg font-medium text-gray-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
