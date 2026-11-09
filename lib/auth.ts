import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("acessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
    {
      headers: { Cookie: `accessToken=${token}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    redirect("/login");
  }

  const data = await response.json();

  if (data.user.role !== "admin") {
    redirect("/");
  }
}
