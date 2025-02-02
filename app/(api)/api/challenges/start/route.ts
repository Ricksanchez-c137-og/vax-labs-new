import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
/* eslint-disable */
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { challengeId } = await req.json();
  if (!challengeId) {
    return new Response(JSON.stringify({ error: "Invalid challenge ID" }), { status: 400 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decoded.id;

    // Generate a dummy flag
    const flag = `FLAG-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    // Use upsert to handle participation
    const participation = await prisma.challengeParticipation.upsert({
      where: {
        userId_challengeId: { userId, challengeId }, // Use compound unique constraint
      },
      update: {
        flag,
        completed: false, // Reset completed status
      },
      create: {
        userId,
        challengeId,
        flag,
        completed: false,
      },
    });

    return new Response(
      JSON.stringify({ message: "Challenge started", flag: participation.flag }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error starting challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
