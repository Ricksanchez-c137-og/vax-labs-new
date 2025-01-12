export async function POST(req: Request) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  
    const { challengeId } = await req.json();
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const userId = decoded.id;
  
      await prisma.challengeParticipation.updateMany({
        where: { userId, challengeId },
        data: { flag: null, completed: false },
      });
  
      return new Response(JSON.stringify({ message: "Challenge reset" }), { status: 200 });
    } catch (error) {
      console.error("Error resetting challenge:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
  }
  