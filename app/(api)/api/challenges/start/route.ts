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

    // ✅ Retrieve the actual challenge ID from challengeId
    const challenge = await prisma.challenge.findUnique({
      where: { challengeId },
    });

    if (!challenge) {
      return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });
    }

    const challengeRealId = challenge.id;

    // Generate a dummy flag
    const flag = `FLAG-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    console.log("UserID:", userId, "ChallengeID:", challengeId, "ChallengeRealID:", challengeRealId, "Generated Flag:", flag);

    // ✅ Fix: Use `findFirst()` instead of `findUnique()` and use `challengeRealId`
    const existingParticipation = await prisma.challengeParticipation.findFirst({
      where: {
        userId: userId,
        challengeRealId: challengeRealId, // Use the real challenge ID
      },
    });

    console.log("Existing Participation:", existingParticipation);

    let participation;

    if (existingParticipation) {
      // ✅ Update the existing record
      participation = await prisma.challengeParticipation.update({
        where: { id: existingParticipation.id }, // Use the unique ID for update
        data: { flag, completed: false },
      });
      console.log("Updated Participation:", participation);
    } else {
      // ✅ Create a new record
      participation = await prisma.challengeParticipation.create({
        data: { userId, challengeRealId, challengeId, flag, completed: false },
      });
      console.log("Created New Participation:", participation);
    }

    return new Response(
      JSON.stringify({ message: "Challenge started", flag: participation.flag }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error starting challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
