"use client";
/* eslint-disable */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      console.error("Unauthorized access:", err);
      localStorage.removeItem("token");
      router.push("/admin");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground font-ubuntu p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push("/admin/db")}
          className="w-full bg-primary text-foreground py-4 rounded-lg hover:bg-primary-foreground transition-all"
        >
          View Database
        </button>
        <button
          onClick={() => router.push("/admin/add-course")}
          className="w-full bg-secondary text-foreground py-4 rounded-lg hover:bg-secondary-foreground transition-all"
        >
          Add Course
        </button>
        <button
          onClick={() => router.push("/admin/add-challenge")}
          className="w-full bg-accent text-foreground py-4 rounded-lg hover:bg-accent-foreground transition-all"
        >
          Add Challenge
        </button>
        <button
          onClick={() => router.push("/admin/add-user")}
          className="w-full bg-destructive text-foreground py-4 rounded-lg hover:bg-destructive-foreground transition-all"
        >
          Add User
        </button>
      </div>
    </div>
  );
}
