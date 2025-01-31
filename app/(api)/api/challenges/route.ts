import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany();
    return new Response(JSON.stringify(challenges), { status: 200 });
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
