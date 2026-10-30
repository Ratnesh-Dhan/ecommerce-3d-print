// ProjectShowcase.tsx - Responsive image gallery with hover effect
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Placeholder image paths – replace with real images in /public/showcase/
const images = [
  "/showcase/lithophanes.jpg",
  "/showcase/mechanical-parts.jpg",
  "/showcase/robotics.jpg",
  "/showcase/prototypes.jpg",
  "/showcase/decor.jpg",
  "/showcase/engineering-components.jpg",
];

export default function ProjectShowcase() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Project Showcase</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={src}
                alt={`Showcase ${idx}`}
                width={400}
                height={300}
                className="object-cover w-full h-full"
                priority={idx < 3}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
