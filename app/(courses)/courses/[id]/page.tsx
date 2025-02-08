"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Course {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function CourseDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId"); // Get courseId from searchParams

  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Course ID:", courseId); // Debug
    if (!courseId) {
      setMessage("Invalid course ID.");
      return;
    }

    async function fetchCourseDetails() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (res.ok) {
          const data = await res.json();
          setCourse(data.course);
          setIsEnrolled(data.isEnrolled);
        } else {
          const errorData = await res.json();
          setMessage(errorData.error || "Course not found.");
        }
      } catch (error) {
        console.log(error);
        setMessage("An error occurred while fetching course details.");
      }
    }
    

    fetchCourseDetails();
  }, [courseId]);

  const handleAction = async (action: "enroll" | "optOut") => {
    if (!courseId) return;

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/courses/enroll`, {
        method: action === "enroll" ? "POST" : "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (res.ok) {
        setIsEnrolled(action === "enroll");
        setMessage(action === "enroll" ? "Enrolled successfully!" : "Opted out successfully.");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "An error occurred.");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while processing your request.");
    }
    setLoading(false);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{course.name}</h1>
        <button
          onClick={() => router.push("/courses")}
          className="bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted-foreground"
        >
          Back to Courses
        </button>
      </div>
      <p className="text-lg mb-4">{course.description}</p>
      <p className="text-sm text-muted-foreground mb-2">
        <strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        <strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}
      </p>
      <div className="mt-6 flex items-center space-x-4">
        {isEnrolled ? (
          <button
            onClick={() => handleAction("optOut")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-destructive text-white hover:bg-destructive-foreground"
            }`}
          >
            {loading ? "Processing..." : "Opt Out"}
          </button>
        ) : (
          <button
            onClick={() => handleAction("enroll")}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-foreground"
            }`}
          >
            {loading ? "Processing..." : "Enroll Now"}
          </button>
        )}
      </div>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
}
