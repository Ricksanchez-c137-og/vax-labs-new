"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="hero-section flex items-center justify-center max-h-[85vh] overflow-hidden px-6 pt-20">
      <div className="flex flex-row items-center justify-between max-w-5xl mx-auto space-x-20">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold text-primary animate-fade-in-down">Welcome to</h1>
          <h2 className="text-6xl font-bold animate-fade-in-up">VaxLabs</h2>
          <p className="mt-4 text-lg">
            We offer real-world cybersecurity challenges, red teaming simulations, and hands-on pentesting experiences for students and professionals.
          </p>
          <Button className="mt-8 bg-transparent border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-foreground transition-all">
            Get In Touch
          </Button>
          <div className="flex space-x-4 mt-6">
            <a href="https://www.linkedin.com/company/vaxlabs/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-primary text-2xl" />
            </a>
            <a href="mailto:info@vaxlabs.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary text-2xl" />
            </a>
          </div>
        </div>

        <div 
          className={`transition-transform duration-300 ${isHovered ? "rotate-0" : "rotate-12"} ml-auto mr-12`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image src="/logo.png" alt="VaxLabs Logo" width={300} height={300} />
        </div>
      </div>
    </section>
  );
} 