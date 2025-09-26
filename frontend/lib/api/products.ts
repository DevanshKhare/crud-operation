interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createProduct(product: Product, token: string): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(id: string, product: Product, token: string): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: string, token: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
