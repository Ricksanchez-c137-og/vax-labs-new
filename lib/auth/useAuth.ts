"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export function useAuth(requiredRole?: string) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/students/student-login");
      return;
    }

    try {
      const decoded = jwtDecode(token) as { role: string };
      if (requiredRole && decoded.role !== requiredRole) {
        router.push("/students/student-login");
      }
    } catch (error) {
      console.error(error);
      router.push("/students/student-login");
    }
  }, [router, requiredRole]);
} 