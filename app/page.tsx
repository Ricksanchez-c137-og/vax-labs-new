"use client";
/* eslint-disable */
import { Button } from "@/components/ui/button";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const challenges = [
    { id: "01", title: "Red Teaming Challenges", description: "Simulate complex attack scenarios to enhance offensive cybersecurity skills." },
    { id: "02", title: "Penetration Testing Playgrounds", description: "Practice safe, controlled testing environments to develop core pentesting skills." },
    { id: "03", title: "University Challenges", description: "Custom challenges for academic institutions aligned with cybersecurity curricula." },
    { id: "04", title: "Corporate Simulations", description: "Replicate corporate infrastructure for targeted employee training." },
  ];

  const challengeTypes = [
    { category: "Red Teaming", title: "Network Based Challenges" },
    { category: "Blue & Red Teaming", title: "Active Directory Challenges" },
    { category: "Red Teaming", title: "Jeopardy Style Challenges" },
    { category: "Red Teaming", title: "Attack-Defence Style Challenges" },
  ];

  const skills = [
    { title: "Penetration Testing", icon: "/penetration-testing.svg" },
    { title: "Incident Response", icon: "/incident-response.png" },
    { title: "Threat Hunting", icon: "/threat-hunting.png" },
    { title: "Security Awareness", icon: "/security-awareness.png" },
    { title: "Bug Bounty", icon: "/bug-bounty.png" },
    { title: "SOC Operations", icon: "/soc.png" },
  ];

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormStatus("Form submitted successfully!");
    setTimeout(() => setFormStatus(""), 3000);
  };

  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
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

          {/* Logo */}
          <div className={`transition-transform duration-300 ${isHovered ? "rotate-0" : "rotate-12"} ml-auto mr-12`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Image src="/logo.png" alt="VaxLabs Logo" width={300} height={300} />
          </div>
        </div>
      </section>

     {/* Offerings Section */}
<section className="bg-background p-12 font-ubuntu">
<h2 className="text-5xl font-bold text-center mb-6 text-primary">What Do We Offer?</h2>
<p className="text-lg text-center max-w-4xl mx-auto mb-12">
VaxLabs provides a wide range of challenges to help individuals and teams develop the hands-on skills needed in cybersecurity. Whether you’re a student looking to complement your studies or a company looking to train your employees, we offer challenges that simulate real-world scenario  </p>
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
      {/* Superscript Span for Challenge ID */}
      <span
        className="text-xl font-bold mr-4"
        style={{ fontSize: '1.25rem', position: 'relative', top: '-0.3rem' }}
      >
        {challenge.id}
      </span>

      {/* Title and Description on the Same Line */}
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl font-bold text-foreground w-[350px]">
          {challenge.title}
        </h3>
        <p className="text-muted-foreground text-justify w-[350px]">
          {challenge.description}
        </p>
      </div>
    </div>
  ))}
</div>
</section>

      {/* Challenge Types Section */}
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

      {/* Skills Section */}
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

      {/* Contact Section */}
    <section className="bg-background p-16 font-ubuntu pb-32">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">Get in Touch!</h2>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between max-w-5xl mx-auto mt-12 space-y-12 lg:space-y-0 lg:space-x-16">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 lg:w-1/2">
          <input type="text" placeholder="Your Name" required className="p-4 rounded-md bg-card text-foreground focus:outline-none" />
          <input type="email" placeholder="Your Email" required className="p-4 rounded-md bg-card text-foreground focus:outline-none" />
          <textarea placeholder="Your Message" rows={5} required className="p-4 rounded-md bg-card text-foreground focus:outline-none"></textarea>
          <button type="submit" className="px-8 py-3 bg-primary text-foreground rounded-md hover:bg-primary-foreground transition-all">Submit</button>
          {formStatus && <p className="text-green-400 mt-4">{formStatus}</p>}
        </form>

        <div className="flex flex-col space-y-8 lg:mt-0 lg:ml-12 lg:w-1/2">
          <div className="flex items-center space-x-6">
            <div className="p-4 rounded-full bg-primary text-foreground">
              <FontAwesomeIcon icon={faPhone} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-lg font-semibold text-foreground">+971 50 166 7123</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="p-4 rounded-full bg-primary text-foreground">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-semibold text-foreground">info@vax-labs.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="p-4 rounded-full bg-primary text-foreground">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-lg font-semibold text-foreground">UAE</p>
            </div>
          </div>
        </div>
      </div>
    </section>

      <footer className="bg-background text-foreground text-center py-4 mt-16 font-ubuntu">
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} | All Rights Reserved |
          <a href="https://vax-labs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground ml-1">
            VaxLabs
          </a>.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="text-primary text-2xl" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="text-primary text-2xl" />
          </a>
          <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="text-primary text-2xl" />
          </a>
        </div>
      </footer>

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
