import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login successful", token }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
