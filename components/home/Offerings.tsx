"use client";

import { useState } from "react";

export default function Offerings() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const challenges = [
    { id: "01", title: "Red Teaming Challenges", description: "Simulate complex attack scenarios to enhance offensive cybersecurity skills." },
    { id: "02", title: "Penetration Testing Playgrounds", description: "Practice safe, controlled testing environments to develop core pentesting skills." },
    { id: "03", title: "University Challenges", description: "Custom challenges for academic institutions aligned with cybersecurity curricula." },
    { id: "04", title: "Corporate Simulations", description: "Replicate corporate infrastructure for targeted employee training." },
  ];

  return (
    <section className="bg-background p-12 font-ubuntu">
      <h2 className="text-5xl font-bold text-center mb-6 text-primary">What Do We Offer?</h2>
      <p className="text-lg text-center max-w-4xl mx-auto mb-12">
        VaxLabs provides a wide range of challenges to help individuals and teams develop the hands-on skills needed in cybersecurity. Whether you're a student looking to complement your studies or a company looking to train your employees, we offer challenges that simulate real-world scenarios.
      </p>
      <div className="space-y-4 max-w-4xl mx-auto">
        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`flex items-center justify-between p-6 rounded-lg transition-all duration-300 ${
              hoveredIndex === index ? "bg-gradient-to-r from-primary to-indigo-900 scale-105 shadow-lg" : "bg-card"
            }`}
          >
            <span className="text-xl font-bold mr-4" style={{ fontSize: '1.25rem', position: 'relative', top: '-0.3rem' }}>
              {challenge.id}
            </span>
            <div className="flex justify-between w-full items-center">
              <h3 className="text-2xl font-bold text-foreground w-[350px]">{challenge.title}</h3>
              <p className="text-muted-foreground text-justify w-[350px]">{challenge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 