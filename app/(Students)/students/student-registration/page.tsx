"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      alert("Registration successful. Please login.");
      window.location.href = "/students/student-login";
    } else {
      const data = await res.json();
      setError(data.error || "An error occurred.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="STUDENT">Student</option>
        <option value="COMPANY">Company</option>
      </select>
      <button type="submit" className="bg-primary text-white px-4 py-2">Register</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
