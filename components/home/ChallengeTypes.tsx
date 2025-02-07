"use client";

export default function ChallengeTypes() {
  const challengeTypes = [
    { category: "Red Teaming", title: "Network Based Challenges" },
    { category: "Blue & Red Teaming", title: "Active Directory Challenges" },
    { category: "Red Teaming", title: "Jeopardy Style Challenges" },
    { category: "Red Teaming", title: "Attack-Defence Style Challenges" },
  ];

  return (
    <section className="bg-background p-12 font-ubuntu">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">Challenge Types</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {challengeTypes.map((type, index) => (
          <div key={index} className="p-6 rounded-lg bg-secondary hover:bg-primary transition-all duration-300 cursor-pointer">
            <p className="text-sm font-semibold text-muted-foreground">{type.category}</p>
            <h3 className="text-lg font-bold mt-2 text-foreground">{type.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
} 