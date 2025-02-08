import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: -1, // Expire the cookie
  });

  return new Response(null, {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
