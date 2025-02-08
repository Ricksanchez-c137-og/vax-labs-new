import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface DecodedToken {
  id: string; // Adjust the type based on your JWT payload structure
  // Add other properties if needed
}


export async function GET(req: Request) {
  // Extract `challengeId` from the URL path
  const url = new URL(req.url);
  const challengeId = url.pathname.split("/").pop();

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!challengeId) {
    return new Response(JSON.stringify({ error: "Invalid challenge ID" }), { status: 400 });
  }

  try {
    console.log("Fetching challenge details...");
    console.log("Challenge ID:", challengeId);

    const challenge = await prisma.challenge.findUnique({
      where: { challengeId },
    });

    console.log("Challenge details:", challenge);
    if (!challenge) {
      return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });
    }

    let isRegistered = false;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      const participation = await prisma.challengeParticipation.findFirst({
        where: { userId: decoded.id, challengeId: challenge.id },
      });

      isRegistered = !!participation;
    }

    return new Response(
      JSON.stringify({
        challenge,
        isRegistered,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching challenge details:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
