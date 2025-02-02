import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: Request) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  
    const { challengeId, submittedFlag } = await req.json();
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const userId = decoded.id;
  
      const participation = await prisma.challengeParticipation.findFirst({
        where: { userId, challengeId },
      });
  
      if (!participation || participation.flag !== submittedFlag) {
        return new Response(JSON.stringify({ error: "Incorrect flag" }), { status: 400 });
      }
  
      await prisma.challengeParticipation.update({
        where: { id: participation.id },
        data: { completed: true },
      });
  
      return new Response(JSON.stringify({ message: "Challenge completed successfully" }), { status: 200 });
    } catch (error) {
      console.error("Error submitting flag:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
  }
  