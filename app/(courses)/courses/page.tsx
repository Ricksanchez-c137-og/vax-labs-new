"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayload } from "jwt-decode";
import { withAuth } from "@/lib/auth/withAuth";

interface Course {
  id: string;
  courseId: string;
  name: string;
  description: string;
}

function Courses({ user }: { user: JwtPayload }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    }

    async function fetchEnrolledCourses() {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/courses/enrolled", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEnrolledCourses(data);
    }

    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/courses/enroll", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    });
    if (res.ok) {
      alert("Enrolled successfully!");
      window.location.reload();
    }
  };

  const handleOptOut = async (courseId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/courses/enroll", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    });
    if (res.ok) {
      alert("Opted out successfully!");
      window.location.reload();
    }
  };

  const handleViewCourse = (courseId: string) => {
    router.push(`/courses/${courseId}?courseId=${courseId}`);
  };

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
              <div
                key={course.courseId}
                className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {course.description}
                  </p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleViewCourse(course.courseId)}
                    className="text-primary font-semibold hover:underline"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleOptOut(course.courseId)}
                    className="text-destructive font-semibold hover:underline"
                  >
                    Opt Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Courses */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => !enrolledCourses.some((ec) => ec.id === course.id))
              .map((course) => (
                <div
                  key={course.id}
                  className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-primary">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {course.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnroll(course.courseId)}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Enroll Now
                  </button>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default withAuth(Courses, "STUDENT");
