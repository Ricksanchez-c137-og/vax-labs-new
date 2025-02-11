"use client";

import { useState } from "react";

export default function AddChallenge() {
  const [challengeId, setChallengeId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (new Date(startDate) >= new Date(endDate)) {
      setMessage("Start date must be earlier than end date.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/challenges/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, name, description, startDate, endDate }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Challenge created successfully!");
        setChallengeId("");
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
      } else {
        setMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while adding the challenge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-ubuntu">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Add Challenge</h2>
        <form onSubmit={handleAddChallenge} className="space-y-4">
          <input
            type="text"
            placeholder="Custom Challenge ID"
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Challenge Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Challenge Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition-all ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-foreground hover:bg-primary-foreground"
            }`}
          >
            {loading ? "Adding Challenge..." : "Add Challenge"}
          </button>
          {message && (
            <p
              className={`text-center mt-2 ${
                message.includes("successfully") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
