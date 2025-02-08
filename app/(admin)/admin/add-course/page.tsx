"use client";

import { useState } from "react";

export default function AddCourse() {
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (new Date(startDate) >= new Date(endDate)) {
      setMessage("Start date must be earlier than end date.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/courses/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, name, description, startDate, endDate }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Course added successfully!");
      setCourseId("");
      setName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
    } else {
      setMessage(data.error || "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-ubuntu">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Add Course</h2>
        <form onSubmit={handleAddCourse} className="space-y-4">
          <input
            type="text"
            placeholder="Custom Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition-all ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-foreground hover:bg-primary-foreground"
            }`}
          >
            {loading ? "Adding Course..." : "Add Course"}
          </button>
          {message && (
            <p
              className={`text-center mt-2 ${
                message.includes("successfully") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
