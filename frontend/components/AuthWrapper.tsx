"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthWrapper({ children }: any) {
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    const publicOnlyRoutes = ["/login", "/register"];
    const path = window.location.pathname;
    if (!isAuth && !publicOnlyRoutes.includes(path)) {
      router.push("/login");
    } else if (isAuth && publicOnlyRoutes.includes(path)) {
      router.push("/");
    }
  }, [isAuth, router]);

  return <>{children}</>;
}