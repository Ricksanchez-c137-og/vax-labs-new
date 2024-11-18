import { verifyToken } from "@/lib/authMiddleWare";
import { cookies } from "next/headers";

export default async function StudentsDashboard() {
  const token = (await cookies()).get("token")?.value;

  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "STUDENT") {
    return <p>Unauthorized. Please log in as a student.</p>;
  }

  return <p>Welcome to the Students' Dashboard!</p>;
}
