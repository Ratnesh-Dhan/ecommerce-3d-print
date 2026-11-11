import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie");
    console.log("Cookie received by Next.js:", !!cookie);
    console.log("Has accessToken:", cookie?.includes("accessToken="));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          Cookie: cookie || "",
        },
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const nextResponse = NextResponse.json(data);

    // Forward the cleared cookie from Express to the browser.
    const setCookie = response.headers.get("set-cookie");

    if (setCookie) {
      nextResponse.headers.set("Set-Cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    console.error("Logout API error:", error);

    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 },
    );
  }
}
