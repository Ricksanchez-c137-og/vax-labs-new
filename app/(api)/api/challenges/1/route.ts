import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const challengeId = url.pathname.split("/").pop();

  try {
    const challenge = await prisma.challenge.findUnique({ where: { challengeId } });
    if (!challenge) return new Response(JSON.stringify({ error: "Challenge not found" }), { status: 404 });

    return new Response(JSON.stringify({ challenge }), { status: 200 });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
