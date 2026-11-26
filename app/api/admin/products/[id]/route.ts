import { isAdmin } from "@/lib/admin-auth";
import { catalogRequest } from "@/lib/catalog";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin(request.headers.get("cookie")))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const response = await catalogRequest(`/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (response.status === 405) {
      return NextResponse.json({ error: "The catalog Worker does not support deletion yet. Deploy the Worker delete route first." }, { status: 502 });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to delete the product. Check the catalog service." }, { status: 503 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin(request.headers.get("cookie")))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const response = await catalogRequest(`/admin/products/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: await request.text(),
    });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to update the product." },
      { status: 503 },
    );
  }
}
