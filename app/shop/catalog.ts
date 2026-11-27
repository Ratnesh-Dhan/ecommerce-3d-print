import type { Product, ProductCategory } from "./data";

export async function loadCatalog(): Promise<Product[]> {
  const response = await fetch("/api/products", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load catalog");
  const items: { slug: string; name: string; category: ProductCategory; price: number; stock: number; specs: string[]; images: { url: string }[] }[] = await response.json();
  return items.map((item) => ({
    id: item.slug,
    name: item.name,
    category: item.category,
    price: item.price,
    stock: item.stock,
    specs: item.specs ?? [],
    image: (item.images ?? []).map((image) => image.url),
    rating: 0,
  }));
}

