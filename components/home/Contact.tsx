"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormStatus("Form submitted successfully!");
    setTimeout(() => setFormStatus(""), 3000);
  };

  return (
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
  );
} 