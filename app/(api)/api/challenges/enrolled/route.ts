import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
/* eslint-disable */
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const participations = await prisma.challengeParticipation.findMany({
      where: { userId: decoded.id },
      include: { challenge: true },
    });

    return new Response(JSON.stringify(participations.map((p) => p.challenge)), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
