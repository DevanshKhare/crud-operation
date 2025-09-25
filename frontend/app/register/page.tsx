"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/users";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({username, password});
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
