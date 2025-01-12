"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Challenge {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function ChallengeDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challengeId");

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!challengeId) {
      setMessage("Invalid challenge ID.");
      return;
    }

    async function fetchChallengeDetails() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/challenges/${challengeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setChallenge(data.challenge);
          setIsRegistered(data.isRegistered);
          console.log("Challenge details:", data.challenge);
        } else {
          const errorData = await res.json();
          setMessage(errorData.error || "Challenge not found.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching challenge details.");
      }
    }

    fetchChallengeDetails();
  }, [challengeId]);

  const handleAction = async (action: "enroll" | "optOut") => {
    if (!challengeId) return;

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/challenges/enroll`, {
        method: action === "enroll" ? "POST" : "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ challengeId }),
      });

      if (res.ok) {
        setIsRegistered(action === "enroll");
        setMessage(action === "enroll" ? "Registered successfully!" : "Opted out successfully.");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred while processing your request.");
    }
    setLoading(false);
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{challenge.name}</h1>
        <button
          onClick={() => router.push("/challenges")}
          className="bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted-foreground"
        >
          Back to Challenges
        </button>
      </div>
      <p className="text-lg mb-4">{challenge.description}</p>
      <p className="text-sm text-muted-foreground mb-2">
        <strong>Start Date:</strong> {new Date(challenge.startDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        <strong>End Date:</strong> {new Date(challenge.endDate).toLocaleDateString()}
      </p>
      <div className="mt-6 flex items-center space-x-4">
        {isRegistered ? (
          <button
            onClick={() => handleAction("optOut")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-destructive text-white hover:bg-destructive-foreground"
            }`}
          >
            {loading ? "Processing..." : "Opt Out"}
          </button>
        ) : (
          <button
            onClick={() => handleAction("enroll")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-foreground"
            }`}
          >
            {loading ? "Processing..." : "Register Now"}
          </button>
        )}
      </div>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
}
