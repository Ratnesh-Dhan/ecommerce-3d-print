const catalogWorkerUrl = process.env.CATALOG_WORKER_URL;
const catalogWorkerSecret = process.env.CATALOG_WORKER_SECRET;

export async function catalogRequest(path: string, init: RequestInit = {}) {
  if (!catalogWorkerUrl || !catalogWorkerSecret) {
    throw new Error("Catalog service is not configured.");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${catalogWorkerSecret}`);

  return fetch(new URL(path, `${catalogWorkerUrl}/`), {
    ...init,
    headers,
    cache: "no-store",
  });
}
