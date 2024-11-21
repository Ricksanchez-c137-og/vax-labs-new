import { verifyToken } from "@/lib/authMiddleware";
import { cookies } from "next/headers";

export default function CompaniesDashboard() {
  const token = cookies().get("token")?.value;

  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "COMPANY") {
    return <p>Unauthorized. Please log in as a company.</p>;
  }

  return <p>Welcome to the Companies' Dashboard!</p>;
}