import { verifyToken } from "@/lib/authMiddleWare";
import { cookies } from "next/headers";

export default async function CompaniesDashboard() {
  const token = (await cookies()).get("token")?.value;

  const user = token ? verifyToken(token) : null;

  if (!user || typeof user === "string" || user.role !== "COMPANY") {
    return <p>Unauthorized. Please log in as a company.</p>;
  }

  return <p>Welcome to the Companies&apos Dashboard!</p>;
}