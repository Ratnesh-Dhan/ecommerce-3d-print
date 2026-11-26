"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  description: string | null;
  specs: string[];
  images?: string[];
  isPublished?: boolean;
};

const categories = ["designs", "filaments", "microcontrollers", "sensors", "motors", "power"];

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch("/api/admin/products", { cache: "no-store" });
        const products: (Omit<Product, "images"> & { images?: (string | { url: string })[] })[] = await response.json();
        if (!response.ok) throw new Error("Unable to load the product.");

        const selectedProduct = products.find((item) => item.id === params.id);
        if (!selectedProduct) throw new Error("Product not found.");
        setProduct({ ...selectedProduct, images: (selectedProduct.images ?? []).map((image) => typeof image === "string" ? image : image.url) });
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load the product.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [params.id]);

  const updateProduct = <Key extends keyof Product>(key: Key, value: Product[Key]) => {
    setProduct((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;

    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to update the product.");
      setMessage("Product updated successfully.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update the product.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadImages = async (files: FileList | null) => {
    if (!files?.length || !product) return;
    setIsUploading(true);
    setMessage("");
    try {
      const urls = await Promise.all(Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        const response = await fetch("/api/upload", { method: "POST", body: data });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || `Unable to upload ${file.name}.`);
        return payload.url as string;
      }));
      updateProduct("images", [...(product.images ?? []), ...urls]);
      setMessage("Images uploaded. Save changes to attach them.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <section className="min-h-screen bg-black px-4 py-12 text-white">Loading product…</section>;
  }

  if (!product) {
    return (
      <section className="min-h-screen bg-black px-4 py-12 text-white">
        <p className="text-yellow-500">{message || "Product not found."}</p>
        <Link href="/admin/products" className="mt-4 inline-block text-sm text-white underline">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin/products" className="text-sm font-semibold text-yellow-500 hover:underline">← Back to products</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">Admin catalog</p>
        <h1 className="mt-2 text-3xl font-black">Edit product</h1>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-yellow-500/20 bg-zinc-950 p-5 sm:p-6">
          <div className="space-y-4">
            <input required placeholder="Product name" value={product.name} onChange={(event) => updateProduct("name", event.target.value)} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
            <input required placeholder="URL slug" value={product.slug} onChange={(event) => updateProduct("slug", event.target.value)} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
            <select value={product.category} onChange={(event) => updateProduct("category", event.target.value)} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500">
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input required min="0" type="number" placeholder="Price" value={product.price} onChange={(event) => updateProduct("price", Number(event.target.value))} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
              <input required min="0" type="number" placeholder="Stock" value={product.stock} onChange={(event) => updateProduct("stock", Number(event.target.value))} className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
            </div>
            <textarea placeholder="Description" value={product.description ?? ""} onChange={(event) => updateProduct("description", event.target.value)} className="min-h-20 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
            <textarea placeholder="Specifications, one per line" value={product.specs.join("\n")} onChange={(event) => updateProduct("specs", event.target.value.split("\n").map((spec) => spec.trim()).filter(Boolean))} className="min-h-24 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Product images</label>
              <input type="file" accept="image/*" multiple disabled={isUploading} onChange={(event) => void uploadImages(event.target.files)} className="block w-full text-sm text-zinc-400 file:mr-3 file:rounded-md file:border-0 file:bg-yellow-500 file:px-3 file:py-2 file:font-bold file:text-black disabled:opacity-60" />
              {isUploading && <p className="mt-2 text-xs text-zinc-400">Uploading images…</p>}
              {(product.images?.length ?? 0) > 0 && <div className="mt-3 grid grid-cols-3 gap-2">{product.images?.map((url) => <div key={url} className="relative"><img src={url} alt="Product preview" className="h-20 w-full rounded object-cover" /><button type="button" onClick={() => updateProduct("images", (product.images ?? []).filter((image) => image !== url))} className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">×</button></div>)}</div>}
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={product.isPublished ?? true} onChange={(event) => updateProduct("isPublished", event.target.checked)} className="accent-yellow-500" />
              Publish in Shop
            </label>
            <button disabled={isSaving || isUploading} className="w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60">
              {isSaving ? "Saving…" : "Save changes"}
            </button>
            {message && <p className="text-sm text-yellow-500">{message}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
