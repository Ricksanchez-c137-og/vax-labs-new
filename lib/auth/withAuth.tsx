"use client";

import { useEffect, useState } from "react";
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
    const [user, setUser] = useState<JWTUser | null>(null);
    const [loading, setLoading] = useState(true);

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
          return;
        }
        setUser(decoded);
      } catch (error) {
        console.log(error);
        router.push("/students/student-login");
      } finally {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) return null;

    return <Component {...props} user={user} />;
  };
} 