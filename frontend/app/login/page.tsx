"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/users";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser({ username, password });
    if (res.token) {
      login(res.token);
      router.push("/");
    }
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}

