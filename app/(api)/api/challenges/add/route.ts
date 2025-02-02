import { PrismaClient } from "@prisma/client";
/* eslint-disable */
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { challengeId, name, description, startDate, endDate } = await req.json();

    if (!challengeId || !name || !description || !startDate || !endDate) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const challenge = await prisma.challenge.create({
      data: {
        challengeId,
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return new Response(JSON.stringify({ message: "Challenge created successfully", challenge }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating challenge:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
