"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function CourseDetails({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data.course);
          setIsEnrolled(data.isEnrolled);
        } else {
          setMessage("Course not found.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching course details.");
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course?.id }),
      });

      if (res.ok) {
        setIsEnrolled(true);
        setMessage("Enrolled successfully!");
      } else {
        const data = await res.json();
        setMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred while enrolling.");
    }
    setLoading(false);
  };

  const handleOptOut = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/courses/enroll", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course?.id }),
      });

      if (res.ok) {
        setIsEnrolled(false);
        setMessage("Opted out successfully.");
      } else {
        const data = await res.json();
        setMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred while opting out.");
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
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <p className="text-lg mb-2">{course.description}</p>
      <p className="text-sm text-muted-foreground">
        Start Date: {new Date(course.startDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-muted-foreground">
        End Date: {new Date(course.endDate).toLocaleDateString()}
      </p>
      <div className="mt-6">
        {isEnrolled ? (
          <button
            onClick={handleOptOut}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-destructive text-foreground hover:bg-destructive-foreground"
            }`}
          >
            {loading ? "Processing..." : "Opt Out"}
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-foreground hover:bg-primary-foreground"
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
