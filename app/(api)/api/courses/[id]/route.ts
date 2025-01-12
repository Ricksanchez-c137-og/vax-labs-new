import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const courseId = url.pathname.split("/").pop(); // Get the dynamic ID

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!courseId) {
    return new Response(JSON.stringify({ error: "Invalid course ID" }), {
      status: 400,
    });
  }

  try {
    const course = await prisma.course.findUnique({
      where: { courseId },
    });

    if (!course) {
      return new Response(
        JSON.stringify({ error: "Course not found" }),
        { status: 404 }
      );
    }

    let isEnrolled = false;

    if (token) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const enrollment = await prisma.enrollment.findFirst({
        where: { userId: decoded.id, courseId: course.id },
      });

      isEnrolled = !!enrollment;
    }

    return new Response(
      JSON.stringify({ course, isEnrolled }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching course details:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
