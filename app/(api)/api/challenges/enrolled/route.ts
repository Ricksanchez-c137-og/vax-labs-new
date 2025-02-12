import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface DecodedToken {
  id: string;
  role: string;
}

export async function GET(req: Request) {
  // Check for Authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Authorization header missing" }), 
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return new Response(
      JSON.stringify({ error: "Invalid authorization format" }), 
      { status: 401 }
    );
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    if(!decoded) {
		return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
	}
    // Verify user role
    if (decoded.role !== "STUDENT") {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Student access required" }), 
        { status: 403 }
      );
    }

    // Fetch enrolled challenges
    const participations = await prisma.challengeParticipation.findMany({
      where: { userId: decoded.id },
      include: { challenge: true },
    });

    return new Response(
      JSON.stringify(participations.map((p) => p.challenge)), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // JWT validation failed
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }), 
        { status: 401 }
      );
    }

    // Log the error for debugging
    console.error("Error in /api/challenges/enrolled:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }), 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
