import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface DecodedToken {
  id: string; // Adjust the type based on your JWT payload structure
  // Add other properties if needed
}


export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const participations = await prisma.challengeParticipation.findMany({
      where: { userId: decoded.id },
      include: { challenge: true },
    });

    return new Response(JSON.stringify(participations.map((p) => p.challenge)), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
