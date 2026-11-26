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
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to save the product." },
      { status: 503 },
    );
  }
}
