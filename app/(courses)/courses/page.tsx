"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
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
      console.log("Enrolled Courses:", data); // Debug
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
    console.log("Navigating to courseId:", courseId); // Debug
    router.push(`/courses/${courseId}?courseId=${courseId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <h2 className="text-lg font-bold mt-6 mb-2">Enrolled Courses</h2>
      {enrolledCourses.map((course: any) => (
        <div key={course.id} className="p-4 border rounded mb-2 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-sm text-muted-foreground">{course.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewCourse(course.courseId)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-foreground"
            >
              View
            </button>
            <button
              onClick={() => handleOptOut(course.id)}
              className="bg-destructive text-white px-4 py-2 rounded-lg hover:bg-destructive-foreground"
            >
              Opt Out
            </button>
          </div>
        </div>
      ))}

      <h2 className="text-lg font-bold mt-6 mb-2">Available Courses</h2>
      {courses
        .filter((course: any) => !enrolledCourses.some((ec: any) => ec.id === course.id))
        .map((course: any) => (
          <div key={course.id} className="p-4 border rounded mb-2">
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-sm text-muted-foreground">{course.description}</p>
            <button
              onClick={() => handleEnroll(course.courseId)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-foreground"
            >
              Enroll Now
            </button>
          </div>
        ))}
    </div>
  );
}
