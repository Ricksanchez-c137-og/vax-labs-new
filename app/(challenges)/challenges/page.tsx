"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";
import { withAuth } from "@/lib/auth/withAuth";

function Challenges({ user }: { user: JwtPayload }) {
  interface Challenge {
    id: string;
    challengeId: string;
    name: string;
    description: string;
  }

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [enrolledChallenges, setEnrolledChallenges] = useState<Challenge[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchChallenges() {
      const res = await fetch("/api/challenges");
      const data = await res.json();
      setChallenges(data);
    }

    async function fetchEnrolledChallenges() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/challenges/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(user);
        if (res.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem("token"); // Clear the token
          router.push("/students/student-login"); // Redirect to login
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setEnrolledChallenges(data);
        } else {
          const errorData = await res.json();
          console.error("Error fetching enrolled challenges:", errorData.error);
        }
      } catch (error) {
        console.error("Error in fetchEnrolledChallenges:", error);
      }
    }

    fetchChallenges();
    fetchEnrolledChallenges();
  }, [router, user]);

  const handleEnroll = async (challengeId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/challenges/enroll", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challengeId }),
    });
    if (res.ok) {
      alert("Enrolled successfully!");
      window.location.reload();
    }
  };

  const handleOptOut = async (challengeId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/challenges/enroll", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challengeId }),
    });
    if (res.ok) {
      alert("Opted out successfully!");
      window.location.reload();
    }
  };

  const handleViewChallenge = (challengeId: string) => {
    router.push(`/challenges/${challengeId}?challengeId=${challengeId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-ubuntu p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Challenges</h1>
        <p className="text-lg text-muted-foreground">
          Explore your enrolled challenges and discover new opportunities.
        </p>
      </header>

      <div className="space-y-12">
        {/* Enrolled Challenges */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Enrolled Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledChallenges.map((challenge) => (
              <div
                key={challenge.challengeId}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{challenge.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {challenge.description}
                  </p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleViewChallenge(challenge.challengeId)}
                    className="text-primary font-semibold hover:underline"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleOptOut(challenge.challengeId)}
                    className="text-destructive font-semibold hover:underline"
                  >
                    Opt Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Challenges */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Available Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter((challenge) => !enrolledChallenges.some((ec) => ec.id === challenge.id))
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-primary">{challenge.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {challenge.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnroll(challenge.challengeId)}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Enroll Now
                  </button>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default withAuth(Challenges, "STUDENT");
