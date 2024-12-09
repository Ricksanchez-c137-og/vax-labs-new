"use client";

import Link from "next/link";

export default function ChallengesPage() {
  // Mock Data for Challenges (Replace with dynamic fetch from backend later)
  const upcomingChallenges = [
    { id: 1, name: "Network Penetration Challenge", description: "Test your network penetration skills in this hands-on challenge." },
    { id: 2, name: "Active Directory Exploitation", description: "Simulate real-world AD exploitation scenarios." },
  ];

  const ongoingChallenges = [
    { id: 3, name: "Phishing Simulation", description: "Learn and execute phishing attacks in a controlled environment." },
    { id: 4, name: "SQL Injection Mastery", description: "Explore SQL injection techniques and mitigations." },
  ];

  const completedChallenges = [
    { id: 5, name: "Web Application Testing", description: "Master web app testing techniques with practical exercises." },
    { id: 6, name: "Blue Team Simulation", description: "Strengthen your defensive skills with a blue team simulation." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-ubuntu p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Challenges</h1>
        <p className="text-lg text-muted-foreground">
          Explore upcoming, ongoing, and completed challenges to improve your skills.
        </p>
      </header>
      <div className="space-y-12">
        {/* Upcoming Challenges */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Upcoming Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.id}`}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{challenge.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{challenge.description}</p>
                </div>
                <span className="mt-4 text-primary font-semibold hover:underline">View Details</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Ongoing Challenges */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Ongoing Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.id}`}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{challenge.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{challenge.description}</p>
                </div>
                <span className="mt-4 text-primary font-semibold hover:underline">View Details</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Completed Challenges */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Completed Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.id}`}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{challenge.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{challenge.description}</p>
                </div>
                <span className="mt-4 text-primary font-semibold hover:underline">View Details</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
