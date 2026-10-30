// HowItWorks.tsx - Steps animation
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { label: "Upload STL" },
  { label: "Instant Quote" },
  { label: "3D Printing" },
  { label: "Delivery" },
];

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="bg-[#F5B301] text-black rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">
                {idx + 1}
              </div>
              <p className="text-lg font-medium">{step.label}</p>
              {idx < steps.length - 1 && (
                <ArrowRight className="text-gray-500 mt-2" size={24} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
