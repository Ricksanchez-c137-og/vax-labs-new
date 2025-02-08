import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface DecodedToken {
  id: string; // Adjust the type based on your JWT payload structure
  // Add other properties if needed
}

export async function POST(req: Request) {
  const { courseId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    console.error("Missing token in request headers.");
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    console.log("Decoded JWT:", decoded);
    console.log("Course ID received:", courseId);

    if (!courseId) {
      return new Response(JSON.stringify({ error: "Invalid courseId in request" }), { status: 400 });
    }

    // Fetch the course using courseId
    const course = await prisma.course.findUnique({ where: { courseId } });
    if (!course) {
      console.error("No course found for courseId:", courseId);
      return new Response(JSON.stringify({ error: "Course not found" }), { status: 404 });
    }

    // Check if the user is already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { userId: decoded.id, courseId: course.courseId },
    });

    if (existingEnrollment) {
      return new Response(JSON.stringify({ error: "Already enrolled" }), { status: 400 });
    }

    // Enroll the student
    await prisma.enrollment.create({
      data: { userId: decoded.id, courseId: course.courseId },
    });

    return new Response(JSON.stringify({ message: "Enrolled successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error enrolling student:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { courseId } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    console.error("Missing token in request headers.");
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    console.log("Decoded JWT:", decoded);

    if (!courseId) {
      return new Response(JSON.stringify({ error: "Invalid courseId in request" }), { status: 400 });
    }

    // Fetch the course to get its internal ID
    const course = await prisma.course.findUnique({ where: { courseId } });
    if (!course) {
      console.error("No course found for courseId:", courseId);
      return new Response(JSON.stringify({ error: "Course not found" }), { status: 404 });
    }

    // Delete the enrollment
    const deleted = await prisma.enrollment.deleteMany({
      where: { userId: decoded.id, courseId: course.id },
    });

    if (deleted.count === 0) {
      console.error("No enrollment found for user:", decoded.id, "and course:", courseId);
      return new Response(JSON.stringify({ error: "Enrollment not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Opted out successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error during unenrollment:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

