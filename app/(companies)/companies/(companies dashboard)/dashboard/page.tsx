import { verifyToken } from "@/lib/authMiddleware";
import { cookies } from "next/headers";

export default async function CompaniesDashboard() {
  const token = (await cookies()).get("token")?.value;

  const user = token ? verifyToken(token) : null;

  return (
    <div>
      Welcome
    </div>
  )
}
