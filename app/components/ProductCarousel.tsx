"use client";

import Image from "next/image";
import Link from "next/link";
import { Cpu, Star } from "lucide-react";
import { useState } from "react";
import { Product, ProductCategory, productsData } from "../shop/data";

const featuredProducts = productsData.slice(0, 10);

const categories: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "Popular" },
  { id: "designs", label: "3D Printed Designs" },
  { id: "microcontrollers", label: "Electronics" },
  { id: "sensors", label: "Sensors" },
  { id: "motors", label: "Motors" },
  { id: "filaments", label: "Filaments" },
];

const getProductImage = (images: string[]) =>
  images.find((image) => image.startsWith("/"));

function ProductCard({ product, duplicate = false }: { product: Product; duplicate?: boolean }) {
  const image = getProductImage(product.image);
  const cardClassName = "group w-[220px] shrink-0 overflow-hidden rounded-2xl border border-yellow-500/15 bg-black transition duration-300 hover:-translate-y-1 hover:border-yellow-500/60 hover:shadow-[0_12px_35px_rgba(234,179,8,0.12)] sm:w-[250px]";

  const content = (
    <>
      <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-yellow-500/10 bg-zinc-900 sm:h-40">
        {image ? (
          <Image src={image} alt={product.name} fill sizes="250px" className="object-cover transition duration-500 group-hover:scale-110" />
        ) : (
          <>
            <div className="absolute h-28 w-28 rounded-full bg-yellow-500/10 blur-2xl" />
            <Cpu size={58} className="relative text-yellow-500/60 transition duration-300 group-hover:scale-110 group-hover:text-yellow-400" />
          </>
        )}
        <span className="absolute bottom-2 left-2 rounded-full border border-white/10 bg-black/75 px-2 py-1 text-[10px] font-bold tracking-wide text-yellow-500 uppercase backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold text-white transition group-hover:text-yellow-500">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-black text-white">₹{product.price}</span>
          <span className="flex items-center gap-1 rounded-md bg-yellow-500/10 px-2 py-1 text-xs font-bold text-yellow-500">
            <Star size={12} fill="currentColor" /> {product.rating}
          </span>
        </div>
      </div>
    </>
  );

  if (duplicate) {
    return <div aria-hidden="true" className={cardClassName}>{content}</div>;
  }

  return <Link href={`/shop/${product.id}`} className={cardClassName}>{content}</Link>;
}

export default function ProductCarousel() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>("all");
  const productsToDisplay = activeCategory === "all"
    ? featuredProducts
    : productsData.filter((product) => product.category === activeCategory);

  return (
    <section className="border-t border-yellow-500/15 bg-zinc-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">
              Shop Featured
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Popular Products &amp; Components
            </h2>
          </div>
          {/* <p className="hidden text-sm text-gray-500 sm:block">Hover to pause</p> */}
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category.id
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-zinc-700 bg-black text-gray-300 hover:border-yellow-500/60 hover:text-yellow-500"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="group overflow-hidden pb-4" aria-label={`${categories.find((category) => category.id === activeCategory)?.label} products`}>
          <div key={activeCategory} className="flex w-max animate-[product-marquee_60s_linear_infinite] motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            <div className="flex shrink-0 gap-4 pr-4">
              {productsToDisplay.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            <div className="flex shrink-0 gap-4 pr-4">
              {productsToDisplay.map((product) => <ProductCard key={`duplicate-${product.id}`} product={product} duplicate />)}
            </div>
          </div>
        </div>

        <div className="mt-2 text-center sm:hidden">
          <p className="text-xs text-gray-500">The display pauses while you browse</p>
        </div>
      </div>
    </section>
  );
}
