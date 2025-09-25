"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthWrapper from "./AuthWrapper";

export default function Navbar() {
  const router = useRouter();
  const { isAuth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AuthWrapper>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link href="/" className="font-bold text-lg">
          ProductApp
        </Link>

        <div className="space-x-4">
          {isAuth ? (
            <>
              <Link href="/" className="cursor-pointer">
                Products
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="cursor-pointer">
                Login
              </Link>
              <Link href="/register" className="cursor-pointer">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </AuthWrapper>
  );
}
