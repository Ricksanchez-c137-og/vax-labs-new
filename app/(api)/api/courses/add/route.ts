import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { courseId, name, description, startDate, endDate } = await req.json();

    if (!courseId || !name || !description || !startDate || !endDate) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    console.log("Adding course:", { courseId, name, description, startDate, endDate });

    // Check if the courseId already exists
    const existingCourse = await prisma.course.findUnique({
      where: { courseId },
    });

    if (existingCourse) {
      return new Response(
        JSON.stringify({ error: "Course ID already exists" }),
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        courseId,
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return new Response(
      JSON.stringify({ message: "Course added successfully", course }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding course:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
