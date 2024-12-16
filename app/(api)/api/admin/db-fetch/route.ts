import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    });

    const courses = await prisma.course.findMany({
      include: {
        students: {
          include: {
            user: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        users,
        courses,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
