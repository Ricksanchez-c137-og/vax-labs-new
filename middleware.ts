import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const publicRoutes = [
  "/students",
  "/students/student-login",
  "/students/student-registration",
  "/companies",
  "/companies/company-login",
  "/companies/company-registration",
  "/about",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/students/student-login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/students/student-login", req.url));
  }
}

export const config = {
  matcher: ["/students/dashboard", "/companies/dashboard"],
};
