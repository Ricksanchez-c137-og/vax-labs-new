"use client";

import Image from "next/image";

export default function Skills() {
  const skills = [
    { title: "Penetration Testing", icon: "/penetration-testing.svg" },
    { title: "Incident Response", icon: "/incident-response.png" },
    { title: "Threat Hunting", icon: "/threat-hunting.png" },
    { title: "Security Awareness", icon: "/security-awareness.png" },
    { title: "Bug Bounty", icon: "/bug-bounty.png" },
    { title: "SOC Operations", icon: "/soc.png" },
  ];

  return (
    <section className="bg-background p-12 font-ubuntu">
      <h2 className="text-4xl font-bold text-center mb-4 text-primary">Skills We Cover</h2>
      <p className="text-center max-w-2xl mx-auto mb-8">
        We help you realize your goals through innovative web projects designed to captivate both you and your customers.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center p-4 rounded-lg border border-primary hover:bg-primary transition-all duration-300 cursor-pointer">
            <Image src={skill.icon} alt={skill.title} width={40} height={40} />
            <h3 className="text-sm font-semibold text-center mt-2 text-foreground">{skill.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
} 