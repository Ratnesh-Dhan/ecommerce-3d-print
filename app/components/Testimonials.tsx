// Testimonials.tsx - Simple testimonial slider
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { rating: 5, text: "Excellent quality and fast delivery." },
  { rating: 5, text: "Amazing print precision." },
  { rating: 5, text: "Highly recommended." },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="flex justify-center mb-4 text-yellow-500">
                {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg italic">{testimonials[index].text}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={prev} className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">Prev</button>
            <button onClick={next} className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
