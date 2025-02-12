"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { withAuth } from "@/lib/auth/withAuth";
import { JwtPayload } from "jsonwebtoken";

function ChallengeDetails({ user }: { user: JwtPayload }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challengeId");

  interface Challenge {
    name: string;
    description: string;
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
      console.log(user);

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
      console.log(error);
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
        setMessage("🎉 Challenge completed successfully!");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to submit flag.");
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  const handleUnenroll = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/challenges/enroll", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      });

      if (res.ok) {
        router.push("/challenges");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to unenroll.");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-yellow-400">{challenge?.name}</h1>
        <p className="text-gray-300 text-center mt-2">{challenge?.description}</p>

        {message && <p className="mt-4 text-center text-red-400">{message}</p>}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          {!started && !completed && (
            <button
              onClick={handleStart}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold w-full text-center"
            >
              {loading ? "Starting..." : "🚀 Start Challenge"}
            </button>
          )}

          {started && !completed && (
            <>
              <p className="text-green-400 text-center">Challenge Started! 🎯</p>
              <a
                href={`/challenges/${challengeId}/${flag}`}
                target="_blank"
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold"
              >
                View Challenge Flag 🔍
              </a>

              <input
                type="text"
                value={userFlag}
                onChange={(e) => setUserFlag(e.target.value)}
                placeholder="Enter flag here..."
                className="mt-4 px-4 py-2 w-full bg-gray-700 border border-gray-600 text-white rounded-lg"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold w-full"
              >
                {loading ? "Submitting..." : "✅ Submit Flag"}
              </button>
            </>
          )}

          {completed && (
            <p className="text-center text-green-400 font-bold text-xl">🎉 Challenge Completed!</p>
          )}

          {started && (
            <button
              onClick={handleReset}
              disabled={loading}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold w-full"
            >
              {loading ? "Resetting..." : "🔄 Reset Challenge"}
            </button>
          )}

          <button
            onClick={handleUnenroll}
            disabled={loading}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold w-full"
          >
            {loading ? "Processing..." : "🚪 Unenroll from Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ChallengeDetails, "STUDENT");
