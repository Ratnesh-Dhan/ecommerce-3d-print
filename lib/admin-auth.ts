interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

export async function getAuthenticatedUser(cookieHeader: string | null) {
  if (!cookieHeader) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = await response.json();
    const user = payload?.data?.user ?? payload?.user;

    return user as AuthUser | null;
  } catch {
    return null;
  }
}

export async function isAdmin(cookieHeader: string | null) {
  const user = await getAuthenticatedUser(cookieHeader);
  return user?.role === "admin";
}
