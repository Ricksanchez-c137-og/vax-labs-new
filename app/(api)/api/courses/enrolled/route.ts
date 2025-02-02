import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
/* eslint-disable */
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: (decoded as jwt.JwtPayload).id },
      include: { course: true },
    });

    return new Response(JSON.stringify(enrollments.map((e) => e.course)), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
