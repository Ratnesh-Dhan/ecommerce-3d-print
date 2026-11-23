import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    const responseBody = await response.text();
    let data: { message?: string; user?: unknown } | null = null;

    try {
      data = responseBody ? JSON.parse(responseBody) : null;
    } catch {
      console.error(
        "Auth backend returned a non-JSON response:",
        response.status,
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.message ??
            `Authentication service returned status ${response.status}.`,
        },
        { status: response.status },
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Authentication service returned an invalid response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Auth session check failed:", error);
    return NextResponse.json(
      { message: "Unable to verify your session." },
      { status: 503 },
    );
  }
}
