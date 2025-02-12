"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ComponentType } from "react";

interface WithAuthProps {
  user: any;
}

export function withAuth(Component: ComponentType<WithAuthProps>, requiredRole?: string) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      
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
        router.push("/students/student-login");
      }
    }, [router]);

    // Get user info from token
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    if (!user) return null;

    return <Component {...props} user={user} />;
  };
} 