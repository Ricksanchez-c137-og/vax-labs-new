"use client";

import Link from "next/link";

export default function CoursesPage() {
  // Mock Data for Courses (Replace with dynamic fetch from backend later)
  const enrolledCourses = [
    { id: 1, name: "Cybersecurity Basics", description: "Learn the fundamentals of cybersecurity." },
    { id: 2, name: "Advanced Pentesting Techniques", description: "Master advanced techniques in penetration testing." },
  ];

  const notYetStartedCourses = [
    { id: 3, name: "Introduction to SOC Operations", description: "Begin your SOC journey with this introductory course." },
    { id: 4, name: "Incident Response Essentials", description: "Learn how to handle cybersecurity incidents effectively." },
  ];

  const upcomingCourses = [
    { id: 5, name: "Threat Intelligence Fundamentals", description: "Understand the basics of threat intelligence." },
    { id: 6, name: "Advanced Malware Analysis", description: "Dive into the world of malware and learn advanced techniques." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-ubuntu p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Courses</h1>
        <p className="text-lg text-muted-foreground">
          Explore your enrolled courses, new courses to start, and upcoming opportunities.
        </p>
      </header>
      <div className="space-y-12">
        {/* Enrolled Courses */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                </div>
                <span className="mt-4 text-primary font-semibold hover:underline">View Details</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Not Yet Started Courses */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Not Yet Started</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notYetStartedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                </div>
                <span className="mt-4 text-primary font-semibold hover:underline">View Details</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Courses */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Upcoming Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                </div>
                <span className="mt-4 text-primary font-semibold hover:underline">View Details</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
