import { NextResponse } from "next/server";

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
    // test
    console.log("Backend status:", response.status);
    const cookies = response.headers.getSetCookie();

    console.log("Backend Set-Cookie count:", cookies.length);
    console.log(
      "Backend cookie names:",
      cookies.map((c) => c.split("=")[0]),
    );
    // test
    const data = await response.json();
    console.log({ data });
    const nextResponse = NextResponse.json({ data }, { status: 200 });
    for (const cookie of cookies) {
      nextResponse.headers.append("Set-Cookie", cookie);
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
