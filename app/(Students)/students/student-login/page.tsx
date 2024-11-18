"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        const { token } = await res.json(); // Ensure the server sends a valid token
        if (!token || typeof token !== "string") {
          throw new Error("Invalid token received from server");
        }
  
        const decoded = jwtDecode<DecodedToken>(token); // Decoding the JWT
        localStorage.setItem("token", token);
        router.push(decoded.role === "STUDENT" ? "/students/dashboard" : "/companies/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "An error occurred.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };
  

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
