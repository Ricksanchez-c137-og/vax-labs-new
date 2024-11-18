import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (!email || !password || !["STUDENT", "COMPANY"].includes(role)) {
    return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Registration successful" }), {
    status: 201,
    headers: { "Set-Cookie": cookie },
  });
}
