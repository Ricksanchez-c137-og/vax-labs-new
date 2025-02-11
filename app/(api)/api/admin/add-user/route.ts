import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    // Validate inputs
    if (!email || !password || !["STUDENT", "COMPANY", "ADMIN"].includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    return new Response(
      JSON.stringify({ message: "User added successfully", user }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
