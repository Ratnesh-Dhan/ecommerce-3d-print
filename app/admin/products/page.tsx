"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  description: string | null;
  specs: string[];
  isPublished?: boolean;
};

const categories = [
  "designs",
  "filaments",
  "microcontrollers",
  "sensors",
  "motors",
  "power",
];

const emptyForm = {
  name: "",
  slug: "",
  category: "designs",
  price: "",
  stock: "0",
  description: "",
  specs: "",
  isPublished: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await response.json();

    if (response.ok) setProducts(data);
    else setMessage(data.error || "Unable to load products.");

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void loadProducts();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [loadProducts]);

  const createSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug: form.slug || createSlug(form.name),
        price: Number(form.price),
        stock: Number(form.stock),
        specs: form.specs
          .split("\n")
          .map((spec) => spec.trim())
          .filter(Boolean),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Unable to create the product.");
    } else {
      setForm(emptyForm);
      setMessage("Product created. Add photos next, then it is ready for Shop.");
      await loadProducts();
    }

    setIsSaving(false);
  };

  return (
    <section className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">
          Admin catalog
        </p>
        <h1 className="mt-2 text-3xl font-black">Products</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Create products here. Prices are in rupees and stock controls availability.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-2xl border border-yellow-500/15 bg-zinc-950 p-5 sm:p-6">
            <h2 className="text-lg font-bold">Current products</h2>
            {isLoading ? (
              <p className="mt-4 text-sm text-zinc-500">Loading products…</p>
            ) : products.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">No products added yet.</p>
            ) : (
              <div className="mt-4 divide-y divide-zinc-800">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="mt-1 text-xs capitalize text-zinc-500">
                        {product.category} · {product.stock} in stock
                      </p>
                    </div>
                    <span className="font-bold text-yellow-500">₹{product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-yellow-500/20 bg-zinc-950 p-5 sm:p-6">
            <h2 className="text-lg font-bold">Add product</h2>
            <div className="mt-5 space-y-4">
              <input required placeholder="Product name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
              <input placeholder="URL slug (auto-created if blank)" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
              <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500">
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input required min="0" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
                <input required min="0" type="number" placeholder="Stock" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
              </div>
              <textarea placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-20 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
              <textarea placeholder="Specifications, one per line" value={form.specs} onChange={(event) => setForm({ ...form, specs: event.target.value })} className="min-h-24 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} className="accent-yellow-500" />
                Publish in Shop after saving
              </label>
              <button disabled={isSaving} className="w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60">
                {isSaving ? "Saving…" : "Create product"}
              </button>
              {message && <p className="text-sm text-yellow-500">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
