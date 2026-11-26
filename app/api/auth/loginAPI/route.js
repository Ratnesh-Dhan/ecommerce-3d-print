import { NextResponse } from "next/server";

function makeCookieLocalToThisSite(cookie, requestUrl) {
  const isHttps = new URL(requestUrl).protocol === "https:";
  let result = cookie.replace(/;\s*Domain=[^;]*/gi, "");

  // A Secure cookie cannot be sent by http://localhost during development.
  // Keep it Secure in production, where the request is HTTPS.
  if (!isHttps) {
    result = result
      .replace(/;\s*Secure/gi, "")
      .replace(/;\s*SameSite=None/gi, "; SameSite=Lax");
  }

  return result;
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();

      console.log("Backend error:", errorData);

      return NextResponse.json(
        { message: errorData.message },
        { status: response.status },
      );
    }
    const cookies = response.headers.getSetCookie();
    const data = await response.json();
    const nextResponse = NextResponse.json({ data }, { status: 200 });
    for (const cookie of cookies) {
      nextResponse.headers.append(
        "Set-Cookie",
        makeCookieLocalToThisSite(cookie, req.url),
      );
    }
    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : error.toString(),
      },
      { status: 500 },
    );
  }
}
