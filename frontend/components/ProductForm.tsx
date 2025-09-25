"use client";

import { useState, useEffect } from "react";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Props {
  onSubmit: (product: Product) => void;
  editingProduct?: Product | null;
}

export default function ProductForm({ onSubmit, editingProduct }: Props) {
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", description: "", price: 0, category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        {editingProduct ? "Update" : "Add"} Product
      </button>
    </form>
  );
}
