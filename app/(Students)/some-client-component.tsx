"use client";

import { useAuth } from "@/lib/auth/useAuth";

export default function SomeClientComponent() {
  useAuth("STUDENT"); // Will redirect if not authenticated or not a student

  return (
    // Your component JSX
  );
} 