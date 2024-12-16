import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: decoded.id,
        courseId,
      },
    });

    if (!enrollment) {
      return new Response(JSON.stringify({ error: "No access to this course" }), { status: 403 });
    }

    return new Response(JSON.stringify({ message: "Access granted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
