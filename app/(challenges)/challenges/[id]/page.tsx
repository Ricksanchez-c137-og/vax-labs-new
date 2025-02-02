"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChallengeDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challengeId");

  interface Challenge {
    name: string;
    description: string;
    // Add other properties as needed
  }

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [flag, setFlag] = useState("");
  const [userFlag, setUserFlag] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Fetch challenge details
    async function fetchChallengeDetails() {
      if (!challengeId) return setMessage("Invalid challenge ID.");

      const token = localStorage.getItem("token");
      const res = await fetch(`/api/challenges/${challengeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setChallenge(data.challenge);
        setCompleted(data.completed);
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Challenge not found.");
      }
    }

    fetchChallengeDetails();
  }, [challengeId]);

  const handleStart = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/challenges/start", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      });

      if (res.ok) {
        const data = await res.json();
        setFlag(data.flag);
        setStarted(true);
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to start challenge.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, submittedFlag: userFlag }),
      });

      if (res.ok) {
        setCompleted(true);
        setMessage("Challenge completed successfully!");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to submit flag.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/challenges/reset", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      });

      if (res.ok) {
        setFlag("");
        setStarted(false);
        setCompleted(false);
        setMessage("Challenge reset.");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to reset challenge.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1>{challenge?.name}</h1>
      <p>{challenge?.description}</p>

      {message && <p>{message}</p>}

      {!started && !completed && (
        <button onClick={handleStart} disabled={loading}>
          {loading ? "Starting..." : "Start Challenge"}
        </button>
      )}

      {started && !completed && (
        <>
          <p>Challenge Flag: <a href={`/challenges/${challengeId}/flag`} target="_blank">View Flag</a></p>
          <input
            type="text"
            value={userFlag}
            onChange={(e) => setUserFlag(e.target.value)}
            placeholder="Enter flag"
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Flag"}
          </button>
        </>
      )}

      {completed && <p>Challenge completed!</p>}

      {started && (
        <button onClick={handleReset} disabled={loading}>
          {loading ? "Resetting..." : "Reset Challenge"}
        </button>
      )}
    </div>
  );
}
