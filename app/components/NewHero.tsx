// NewHero.tsx - Premium redesigned hero section
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Placeholder showcase images – replace with actual product images in /public/showcase/
const showcaseImages = [
  "/showcase/lithophane-lamp.jpg",
  "/showcase/articulated-dragon.jpg",
  "/showcase/modern-vase.jpg",
  "/showcase/mechanical-gear.jpg",
  "/showcase/prototype-part.jpg",
  "/showcase/robot-component.jpg",
  "/showcase/controller-stand.jpg",
];

const bulletPoints = [
  "Instant Online Quote",
  "High Precision Printing",
  "Multiple Materials",
  "Fast Turnaround",
  "Pan India Shipping",
];

export default function NewHero() {
  // Rotating showcase index
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  // Fade‑in animation for right side image
  useEffect(() => {
    controls.start({ opacity: 1, scale: 1, transition: { duration: 0.8 } });
  }, [index, controls]);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-4 sm:px-6 py-16 lg:py-20 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-white">
            Professional 3D Printing<br />
            <span className="text-[#F5B301]">Bring Your Ideas To Life</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Upload your STL files, receive an instant quote, and get high‑quality 3D printed parts delivered anywhere in India.
          </p>
          <ul className="space-y-2 text-gray-400">
            {bulletPoints.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#F5B301] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            <a
              href="/Stl"
              className="bg-[#F5B301] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#e5a400] transition"
            >
              Get Instant Quote
            </a>
            <a
              href="/Products"
              className="border border-[#F5B301] text-[#F5B301] font-semibold px-6 py-3 rounded-lg hover:bg-[#F5B301]/10 transition"
            >
              Explore Products
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE – rotating showcase */}
        <motion.div
          className="relative w-full h-[300px] sm:h-[400px]"
          animate={controls}
          initial={{ opacity: 0, scale: 0.95 }}
        >
          <Image
            src={showcaseImages[index]}
            alt="Showcase item"
            fill
            className="object-cover rounded-xl shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
