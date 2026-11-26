import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let backendNotified = false;

  try {
    const cookie = request.headers.get("cookie");
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
    backendNotified = response.ok;
    if (!response.ok) console.error("Logout backend returned status:", response.status);
  } catch (error) {
    console.error("Logout backend unavailable:", error instanceof Error ? error.message : "Unknown error");
  }

  // The login proxy sets a host-only cookie on this site. Clear that cookie
  // even if the remote auth service is temporarily unavailable.
  const response = NextResponse.json({
    success: true,
    backendNotified,
    message: backendNotified
      ? "Logged out successfully."
      : "Logged out on this browser. The authentication service is unavailable.",
  });
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
