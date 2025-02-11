"use client";

import Navbar from "@/components/home/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import Offerings from "@/components/home/Offerings";
import ChallengeTypes from "@/components/home/ChallengeTypes";
import Skills from "@/components/home/Skills";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <Hero />
      <Offerings />
      <ChallengeTypes />
      <Skills />
      <Contact />
      <Footer />

      {showScroll && (
        <button
          className="fixed bottom-8 right-8 p-3 bg-primary text-foreground rounded-full shadow-lg hover:bg-primary-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
}
