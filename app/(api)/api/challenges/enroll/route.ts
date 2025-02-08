import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface DecodedToken {
  id: string; // Adjust the type based on your JWT payload structure
  // Add other properties if needed
}


export async function POST(req: Request) {
  const { challengeId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // ✅ Fetch the real challenge ID
    const challenge = await prisma.challenge.findUnique({ where: { challengeId } });

    if (!challenge) {
      return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });
    }

    // ✅ Store both real challenge ID and challengeId
    await prisma.challengeParticipation.create({
      data: { userId: decoded.id, challengeRealId: challenge.id, challengeId: challenge.challengeId },
    });

    return new Response(JSON.stringify({ message: "Enrolled successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error enrolling in challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}


export async function DELETE(req: Request) {
  const { challengeId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const challenge = await prisma.challenge.findUnique({ where: { challengeId } });

    if (!challenge) {
      return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });
    }

    await prisma.challengeParticipation.deleteMany({
      where: { userId: decoded.id, challengeRealId: challenge.id, challengeId: challenge.challengeId },
    });

    return new Response(JSON.stringify({ message: "Opted out successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error opting out of challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
