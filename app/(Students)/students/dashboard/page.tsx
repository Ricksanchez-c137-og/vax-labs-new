"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ChallengesGrid from "@/components/dashboard/ChallengesGrid";
import LearningPathsGrid from "@/components/dashboard/LearningPathsGrid";
import CoursesGrid from "@/components/dashboard/CoursesGrid";
import { JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  roll?: string;
  name?: string;
  role: string;
}

export default function StudentsDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/students/student-login");
        return;
      }

      try {
        const decoded = jwtDecode(token) as DecodedToken;
        if (decoded.role !== "STUDENT") {
          router.push("/students/student-login");
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error(error);
        router.push("/students/student-login");
      }
    }
  }, [router]);

  if (!user) return null; 

  return (
    <div className="flex h-screen bg-[#1E1E1E] text-white">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#1E1E1E] overflow-auto">
        <Header username={user.roll || "Ameen"} />
        <div className="space-y-8">
          <ChallengesGrid />
          <LearningPathsGrid />
          <CoursesGrid />
        </div>
      </main>
    </div>
  );
}
