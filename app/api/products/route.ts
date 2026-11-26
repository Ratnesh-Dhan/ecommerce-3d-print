import { catalogRequest } from "@/lib/catalog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await catalogRequest("/products");
    if (!response.ok) return NextResponse.json({ error: "Catalog unavailable." }, { status: 502 });
    const products = await response.json();
    const bucket = process.env.B2_BUCKET_NAME;
    const base = (process.env.B2_PUBLIC_URL || `https://f005.backblazeb2.com/file/${bucket}`).replace(/\/$/, "");
    if (bucket && Array.isArray(products)) {
      for (const product of products) {
        for (const image of product.images ?? []) {
          if (typeof image.url === "string" && image.url.startsWith(`${base}/products/`)) {
            const key = image.url.slice(base.length + 1);
            image.url = `/api/product-image?key=${encodeURIComponent(key)}`;
          }
        }
      }
    }
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Catalog unavailable." }, { status: 503 });
  }
}
