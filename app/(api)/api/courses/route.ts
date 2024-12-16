import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const courses = await prisma.course.findMany();
  return new Response(JSON.stringify(courses), { status: 200 });
}
