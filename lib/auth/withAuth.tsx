"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ComponentType } from "react";

export interface JWTUser {
  role: string;
  // Add other fields from your JWT token here
}

interface WithAuthProps {
  user: JWTUser;
}

export function withAuth(Component: ComponentType<WithAuthProps>, requiredRole?: string) {
  return function AuthenticatedComponent(props: Omit<WithAuthProps, 'user'>) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/students/student-login");
        return;
      }

      try {
        const decoded = jwtDecode(token) as JWTUser;
        if (requiredRole && decoded.role !== requiredRole) {
          router.push("/students/student-login");
        }
      } catch (error) {
        console.log(error);
        router.push("/students/student-login");
      }
    }, [router]);

    // Get user info from token
    const token = localStorage.getItem("token");
    const user = token ? (jwtDecode(token) as JWTUser) : null;

    if (!user) return null;

    return <Component {...props} user={user} />;
  };
} 