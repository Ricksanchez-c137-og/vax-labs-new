import { verifyToken } from "@/lib/authMiddleWare";
import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ChallengesGrid from "@/components/dashboard/ChallengesGrid";
import LearningPathsGrid from "@/components/dashboard/LearningPathsGrid";
import CoursesGrid from "@/components/dashboard/CoursesGrid";

export default async function StudentsDashboard() {
  const token = (await cookies()).get("token")?.value;
  const user = token ? (verifyToken(token) as JwtPayload) : null;

  if (!user || user.role !== "STUDENT") {
    return <p>Unauthorized. Please log in as a student.</p>;
  }

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
