"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authChecked, user } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (authChecked && !isAdmin) {
      router.replace(user ? "/" : "/login");
    }
  }, [authChecked, isAdmin, router, user]);

  if (!authChecked) {
    return <div className="min-h-screen bg-black p-8 text-white">Checking admin access…</div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="admin-layout">
      <aside>
        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin">Dashboard</a>
          <Link href="/admin/products">Products</Link>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/users">Users</a>
        </nav>
      </aside>

      <main>{children}</main>
    </div>
  );
}
