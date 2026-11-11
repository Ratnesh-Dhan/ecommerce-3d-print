import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 },
      );
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
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
    const data = await response.json();
    const cookies = response.headers.getSetCookie();
    const nextResponse = NextResponse.json({ data }, { status: 200 });
    for (const cookie of cookies) {
      nextResponse.headers.append("Set-Cookie", cookie);
    }
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : error.toString() },
      { status: 500 },
    );
  }
}
