/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [loading, setLoading] = useState(true); // Initial loading state
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function fetchChallengeDetails() {
      try {
        if (!challengeId) return setMessage("Invalid challenge ID.");

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          router.push("/students/student-login");
          return;
        }

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
      } catch (error) {
        console.error("Error fetching challenge details:", error);
        setMessage("An error occurred while fetching the challenge.");
      } finally {
        setLoading(false);
      }
    }

    if (typeof window !== "undefined") {
      fetchChallengeDetails();
    }
  }, [router, user, challengeId]);

  const handleAction = async (endpoint: string, method: string, body: object = {}) => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(endpoint, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An error occurred.");
      }

      return await res.json();
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    const data = await handleAction("/api/challenges/start", "POST", { challengeId });
    if (data) {
      setFlag(data.flag);
      setStarted(true);
    }
  };

  const handleSubmit = async () => {
    const data = await handleAction("/api/challenges/submit", "POST", {
      challengeId,
      submittedFlag: userFlag,
    });
    if (data) {
      setCompleted(true);
      setMessage("🎉 Challenge completed successfully!");
    }
  };

  const handleReset = async () => {
    const data = await handleAction("/api/challenges/reset", "POST", { challengeId });
    if (data) {
      setFlag("");
      setStarted(false);
      setCompleted(false);
      setMessage("Challenge reset.");
    }
  };

  const handleUnenroll = async () => {
    const data = await handleAction("/api/challenges/enroll", "DELETE", { challengeId });
    if (data) {
      router.push("/challenges");
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-yellow-400">{challenge?.name}</h1>
        <p className="text-gray-300 text-center mt-2">{challenge?.description}</p>

        {message && <p className="mt-4 text-center text-red-400">{message}</p>}

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
