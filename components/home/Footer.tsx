"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
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
  );
} 