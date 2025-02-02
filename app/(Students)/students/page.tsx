"use client";
/* eslint-disable */
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
        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-primary mb-4">Empower Your Cybersecurity Journey</h1>
        <p className="text-lg max-w-4xl mx-auto mb-10">
          Dive into hands-on challenges designed to enhance your cybersecurity skills and prepare you for real-world scenarios. Whether you're a student seeking knowledge or a professional building expertise, VaxLabs is your ultimate training ground.
        </p>

        {/* Call-to-Actions */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleStudentRegistration}
            className="bg-primary text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground transition-all"
          >
            Start Your Journey
          </button>
          <button
            onClick={handleStudentLogin}
            className="bg-secondary text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-background transition-all"
          >
            Continue Learning
          </button>
        </div>
      </section>
    </div>
  );
}
