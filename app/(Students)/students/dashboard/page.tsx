import { verifyToken } from "@/lib/authMiddleWare";
import { cookies } from "next/headers";

export default async function StudentsDashboard() {
  const token = (await cookies()).get("token")?.value;

  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "STUDENT") {
    return <p>Unauthorized. Please log in as a student.</p>;
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground font-ubuntu">
      {/* Sidebar */}
      <aside className="w-1/5 bg-card p-6 flex flex-col items-start space-y-4 border-r border-border">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <nav className="flex flex-col space-y-4 text-muted-foreground">
          <a href="#" className="hover:text-primary">Dashboard</a>
          <a href="#" className="hover:text-primary">My Assignments</a>
          <a href="#" className="hover:text-primary">Leaderboard</a>
          <a href="#" className="hover:text-primary">Challenges</a>
          <a href="#" className="hover:text-primary">Courses</a>
          <a href="#" className="hover:text-primary">Learning Path</a>
          <div className="pt-4 space-y-2">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Streak</button>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Points #</button>
          </div>
        </nav>
        <div className="mt-auto space-y-2 text-sm">
          <a href="#" className="hover:text-primary">My Profile</a>
          <a href="#" className="hover:text-primary">Report Feedback</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome {user.name || "Student"}</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              <img src="/bell-icon.png" alt="Notifications" className="h-6 w-6" />
            </button>
            <div className="bg-muted-foreground text-foreground px-4 py-2 rounded-full">Points: #</div>
            <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
          </div>
        </header>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Challenges */}
          <div className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Upcoming Challenges</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-24 bg-muted rounded-md"></div>
              <div className="w-full h-24 bg-muted rounded-md"></div>
              <div className="w-full h-24 bg-muted rounded-md"></div>
              <div className="w-full h-24 bg-muted rounded-md"></div>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Learning Paths Enrolled</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-24 bg-muted rounded-md"></div>
              <div className="w-full h-24 bg-muted rounded-md"></div>
            </div>
          </div>

          {/* Courses Enrolled */}
          <div className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Courses Enrolled</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-24 bg-muted rounded-md"></div>
              <div className="w-full h-24 bg-muted rounded-md"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
