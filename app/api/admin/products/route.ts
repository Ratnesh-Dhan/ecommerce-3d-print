import { isAdmin } from "@/lib/admin-auth";
import { catalogRequest } from "@/lib/catalog";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin(request: NextRequest) {
  return isAdmin(request.headers.get("cookie"));
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await catalogRequest("/admin/products");
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the catalog service." },
      { status: 503 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await catalogRequest("/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await request.text(),
    });
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      console.error("Catalog product creation returned a non-JSON response; status:", response.status);
      return NextResponse.json(
        { error: `Catalog service returned an unexpected response (HTTP ${response.status}). Check the Worker logs.` },
        { status: 502 },
      );
    }
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error("Catalog product creation request failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Unable to save the product." },
      { status: 503 },
    );
  }
}
