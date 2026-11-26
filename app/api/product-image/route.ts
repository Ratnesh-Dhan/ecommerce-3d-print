import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import { NextRequest, NextResponse } from "next/server";
import { catalogRequest } from "@/lib/catalog";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key || !key.startsWith("products/")) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const bucket = process.env.B2_BUCKET_NAME;
  const endpoint = process.env.B2_ENDPOINT?.trim();
  const accessKeyId = process.env.B2_KEY_ID?.trim();
  const secretAccessKey = process.env.B2_APPLICATION_KEY?.trim();
  if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
    return NextResponse.json({ error: "Image service unavailable" }, { status: 503 });
  }

  try {
    const base = (process.env.B2_PUBLIC_URL || `https://f005.backblazeb2.com/file/${bucket}`).replace(/\/$/, "");
    const imageUrl = `${base}/${key}`;
    const catalog = await catalogRequest("/products");
    if (!catalog.ok) return NextResponse.json({ error: "Catalog unavailable" }, { status: 503 });
    const products: { images?: { url?: string }[] }[] = await catalog.json();
    if (!products.some((product) => product.images?.some((image) => image.url === imageUrl))) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const client = new S3Client({
      endpoint: /^https?:\/\//i.test(endpoint) ? endpoint : `https://${endpoint}`,
      credentials: { accessKeyId, secretAccessKey },
      region: "us-east-005",
    });
    const object = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    if (!object.Body || !(object.Body instanceof Readable)) return NextResponse.json({ error: "Image not found" }, { status: 404 });
    return new NextResponse(Readable.toWeb(object.Body) as ReadableStream, {
      headers: {
        "Content-Type": object.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=300",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Product image request failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Image unavailable" }, { status: 503 });
  }
}
