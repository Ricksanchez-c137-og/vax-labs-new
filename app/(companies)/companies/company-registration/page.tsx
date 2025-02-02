"use client";
/* eslint-disable */
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (res.ok) {
        alert("Registration successful. Please login.");
        window.location.href = "/companies/company-login";
      } else {
        const data = await res.json();
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-md bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-md bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 rounded-md bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="STUDENT">Student</option>
            <option value="COMPANY">Company</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-foreground rounded-md hover:bg-primary-foreground transition-all"
          >
            Register
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
