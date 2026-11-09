import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="admin-layout">
      <aside>
        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin">Dashboard</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/users">Users</a>
        </nav>
      </aside>

      <main>{children}</main>
    </div>
  );
}
