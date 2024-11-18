"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

export default function Students() {
  const router = useRouter();

  const handleStudentLogin = () => {
    router.push("/students/student-login");
  };

  const handleStudentRegistration = () => {
    router.push("/students/student-registration");
  };

  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <h2 className="text-5xl font-bold text-primary mb-6">For Students</h2>
        <p className="text-lg max-w-4xl mx-auto mb-6">
          Welcome to VaxLabs! Hands-on challenges to develop essential cybersecurity skills.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStudentRegistration}
            className="bg-primary text-foreground px-6 py-3 rounded-full hover:bg-primary-foreground transition-all"
          >
            Register
          </button>
          <button
            onClick={handleStudentLogin}
            className="bg-secondary text-foreground px-6 py-3 rounded-full hover:bg-primary hover:text-background transition-all"
          >
            Login
          </button>
        </div>
      </section>
    </div>
  );
}
