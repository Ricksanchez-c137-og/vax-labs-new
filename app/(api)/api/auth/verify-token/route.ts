import jwt from "jsonwebtoken";
/* eslint-disable */
export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "Token missing" }), { status: 400 });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);

    return new Response(JSON.stringify(verified), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
