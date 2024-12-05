import { verifyToken } from "@/lib/authMiddleWare";
import { cookies } from "next/headers";
import { FaTachometerAlt, FaBook, FaTrophy, FaTasks, FaChartBar, FaRoute, FaUser, FaComment, FaFire } from "react-icons/fa";
import Link from "next/link";

export default async function StudentsDashboard() {
  const token = (await cookies()).get("token")?.value;

  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "STUDENT") {
    return <p>Unauthorized. Please log in as a student.</p>;
  }

  // Mock Data for Courses (Replace with dynamic fetch from backend later)
  const courses = [
    { id: 1, name: "Cybersecurity Basics" },
    { id: 2, name: "Advanced Pentesting Techniques" },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground font-ubuntu">
      {/* Sidebar */}
      <aside className="w-1/5 bg-card p-6 flex flex-col items-start space-y-6 border-r border-border">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <div className="flex flex-col h-full bg-card text-foreground w-64 py-6 px-4 space-y-6">
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaTachometerAlt className="text-2xl" />
              <span className="text-sm">Dashboard</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaBook className="text-2xl" />
              <span className="text-sm">My Assignments</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaChartBar className="text-2xl" />
              <span className="text-sm">Leaderboard</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaTasks className="text-2xl" />
              <span className="text-sm">Challenges</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaTrophy className="text-2xl" />
              <span className="text-sm">Courses</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaRoute className="text-2xl" />
              <span className="text-sm">Learning Path</span>
            </a>
            <div className="mt-auto space-y-4">
              <button className="flex flex-col items-center space-y-2 bg-accent text-white py-2 px-4 rounded hover:bg-accent-foreground">
                <FaFire className="text-2xl" />
                <span className="text-sm">Streak</span>
              </button>
              <button className="flex flex-col items-center space-y-2 bg-accent text-white py-2 px-4 rounded hover:bg-accent-foreground">
                <span className="text-sm font-bold">Points #</span>
              </button>
            </div>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaUser className="text-2xl" />
              <span className="text-sm">My Profile</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary">
              <FaComment className="text-2xl" />
              <span className="text-sm">Report Feedback</span>
            </a>
          </div>
        </nav>
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
              <Link href="/challenges/1" className="w-full h-24 bg-muted rounded-md hover:shadow-lg flex items-center justify-center text-center"> Challenge 1</Link>
              <Link href="/challenges/2" className="w-full h-24 bg-muted rounded-md hover:shadow-lg flex items-center justify-center text-center">Challenge 2</Link>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Learning Paths Enrolled</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/learning-paths/1" className="w-full h-24 bg-muted rounded-md hover:shadow-lg flex items-center justify-center text-center">Path 1</Link>
              <Link href="/learning-paths/2" className="w-full h-24 bg-muted rounded-md hover:shadow-lg flex items-center justify-center text-center">Path 2</Link>
            </div>
          </div>

          {/* Courses Enrolled */}
          <div className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Courses Enrolled</h2>
            <div className="grid grid-cols-2 gap-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="w-full h-24 bg-muted rounded-md hover:shadow-lg flex items-center justify-center text-center"
                >
                  <span>{course.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
