import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAuthenticatedUser, hasAdminRole } from "./admin-auth";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const user = await getAuthenticatedUser(cookieStore.toString());

  if (!user) {
    redirect("/login");
  }

  if (!hasAdminRole(user)) {
    redirect("/");
  }
}
