"use client";

import { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../lib/api/products";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  async function loadProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddOrUpdate(product: Product) {
    try {
      if (!token) {
        alert("You must be logged in to modify products.");
        return;
      }
      if (editingProduct) {
        await updateProduct(editingProduct.id!, product, token);
        setEditingProduct(null);
      } else {
        await createProduct(product, token);
      }
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      if (!token) {
        alert("You must be logged in to delete products.");
        return;
      }
      await deleteProduct(id, token);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductForm onSubmit={handleAddOrUpdate} editingProduct={editingProduct} />
      <ProductList
        products={products}
        onEdit={(p) => setEditingProduct(p)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default page;