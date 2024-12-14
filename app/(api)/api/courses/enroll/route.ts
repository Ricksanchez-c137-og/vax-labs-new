import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { courseId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    await prisma.enrollment.create({
      data: { userId: decoded.id, courseId },
    });

    return new Response(JSON.stringify({ message: "Enrolled successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token or duplicate enrollment" }), { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { courseId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    await prisma.enrollment.deleteMany({
      where: { userId: decoded.id, courseId },
    });

    return new Response(JSON.stringify({ message: "Opted out successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token or enrollment not found" }), { status: 400 });
  }
}
