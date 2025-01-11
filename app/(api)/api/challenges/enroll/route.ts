import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { challengeId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const challenge = await prisma.challenge.findUnique({ where: { challengeId } });

    if (!challenge) {
      return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });
    }

    await prisma.challengeParticipation.create({
      data: { userId: decoded.id, challengeId: challenge.id },
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
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const challenge = await prisma.challenge.findUnique({ where: { challengeId } });

    if (!challenge) {
      return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });
    }

    await prisma.challengeParticipation.deleteMany({
      where: { userId: decoded.id, challengeId: challenge.id },
    });

    return new Response(JSON.stringify({ message: "Opted out successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error opting out of challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
