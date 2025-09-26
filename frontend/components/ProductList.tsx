"use client";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductList({ products, onEdit, onDelete }: Props) {
  return (
    <ul className="space-y-4">
      {products.map((p) => (
        <li
          key={p.id}
          className="p-4 border rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-sm">
              {p.price} | {p.category}
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(p)}
              className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(p.id!)}
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
