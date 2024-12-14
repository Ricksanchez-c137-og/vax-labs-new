"use client";

import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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

  const handleEnroll = async (courseId) => {
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

  const handleOptOut = async (courseId) => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <h2 className="text-lg font-bold mt-6 mb-2">Enrolled Courses</h2>
      {enrolledCourses.map((course) => (
        <div key={course.id} className="p-4 border rounded mb-2">
          <h3>{course.name}</h3>
          <button onClick={() => handleOptOut(course.id)}>Opt Out</button>
        </div>
      ))}

      <h2 className="text-lg font-bold mt-6 mb-2">Available Courses</h2>
      {courses
        .filter((course) => !enrolledCourses.some((ec) => ec.id === course.id))
        .map((course) => (
          <div key={course.id} className="p-4 border rounded mb-2">
            <h3>{course.name}</h3>
            <button onClick={() => handleEnroll(course.id)}>Enroll Now</button>
          </div>
        ))}
    </div>
  );
}
