"use client";

import { useEffect, useState } from "react";

export default function AdminDBPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/db-fetch");
        if (!res.ok) throw new Error("Failed to fetch data");
        const fetchedData = await res.json();
        setData(fetchedData);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-background text-foreground font-ubuntu min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Database View</h1>

      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        {data.users.length > 0 ? (
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr>
                <th className="border border-border p-2">ID</th>
                <th className="border border-border p-2">Email</th>
                <th className="border border-border p-2">Role</th>
                <th className="border border-border p-2">Enrollments</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-border p-2">{user.id}</td>
                  <td className="border border-border p-2">{user.email}</td>
                  <td className="border border-border p-2">{user.role}</td>
                  <td className="border border-border p-2">
                    {user.enrollments.length > 0 ? (
                      <ul>
                        {user.enrollments.map((enrollment) => (
                          <li key={enrollment.id}>{enrollment.course.name}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </section>

      {/* Courses Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        {data.courses.length > 0 ? (
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr>
                <th className="border border-border p-2">Course ID</th>
                <th className="border border-border p-2">Name</th>
                <th className="border border-border p-2">Description</th>
                <th className="border border-border p-2">Students</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map((course) => (
                <tr key={course.id}>
                  <td className="border border-border p-2">{course.courseId}</td>
                  <td className="border border-border p-2">{course.name}</td>
                  <td className="border border-border p-2">{course.description}</td>
                  <td className="border border-border p-2">
                    {course.students.length > 0 ? (
                      <ul>
                        {course.students.map((student) => (
                          <li key={student.id}>{student.user.email}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses found.</p>
        )}
      </section>

      {/* Challenges Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Challenges</h2>
        {data.challenges.length > 0 ? (
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr>
                <th className="border border-border p-2">Challenge ID</th>
                <th className="border border-border p-2">Name</th>
                <th className="border border-border p-2">Description</th>
                <th className="border border-border p-2">Participants</th>
              </tr>
            </thead>
            <tbody>
              {data.challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td className="border border-border p-2">{challenge.challengeId}</td>
                  <td className="border border-border p-2">{challenge.name}</td>
                  <td className="border border-border p-2">{challenge.description}</td>
                  <td className="border border-border p-2">
                    {challenge.participants.length > 0 ? (
                      <ul>
                        {challenge.participants.map((participant) => (
                          <li key={participant.id}>{participant.user.email}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No challenges found.</p>
        )}
      </section>
    </div>
  );
}
