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

    // Convert startDate and endDate into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new Response(
        JSON.stringify({ error: "Invalid date format" }),
        { status: 400 }
      );
    }

    // Create the course
    const course = await prisma.course.create({
      data: {
        courseId,
        name,
        description,
        startDate: start,
        endDate: end,
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
