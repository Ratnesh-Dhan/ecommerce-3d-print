// StatsSection.tsx - Animated statistics counters
"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const stats = [
  { label: "Orders Completed", value: 500 },
  { label: "Happy Clients", value: 150 },
  { label: "Avg Turnaround (hrs)", value: 24 },
  { label: "Print Success (%)", value: 99 },
];

// Placeholder images for each stat – place images in public/images/stats/
const statImages = [
  "/images/stats/orders.jpg",
  "/images/stats/clients.jpg",
  "/images/stats/turnaround.jpg",
  "/images/stats/success.jpg",
];

export default function StatsSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } });
  }, [controls]);

  return (
    <section className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center"
          >
            <Image src={statImages[idx]} alt={item.label} width={80} height={80} className="mx-auto mb-2" />
            <motion.span
              initial={{ count: 0 }}
              animate={{ count: item.value }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl font-bold text-[#F5B301]"
            >
              {"{{count}}"}
            </motion.span>
            <p className="mt-2 text-lg text-gray-400">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
