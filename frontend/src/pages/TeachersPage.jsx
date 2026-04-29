import { useEffect, useState } from "react";
import { fetchTeachers } from "../api/index.js";
import StatusMessage from "../components/StatusMessage.jsx";

// ─── Teachers Page ────────────────────────────────────────────────────────────
// Fetches and displays all teachers from GET /api/teachers.
//
// Expected teacher shape:
//   { _id, name, email, subjects: ["Math", "Physics"] }
//   (subjects may also be [{ name }] objects — both are handled)

function resolveSubjects(subjects) {
  if (!Array.isArray(subjects) || subjects.length === 0) return [];
  // Handle both string[] and object[]
  return subjects.map((s) => (typeof s === "string" ? s : s.name ?? "—"));
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetchTeachers()
      .then((data) => setTeachers(Array.isArray(data) ? data : data.teachers ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Page header ── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Faculty members and their assigned subjects.
          </p>
        </div>
        {!loading && !error && (
          <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
            {teachers.length} teachers
          </span>
        )}
      </div>

      {/* ── States ── */}
      {loading && <StatusMessage type="loading" message="Loading teachers…" />}
      {!loading && error && <StatusMessage type="error" message={error} />}
      {!loading && !error && teachers.length === 0 && (
        <StatusMessage type="empty" message="No teachers found." />
      )}

      {/* ── Cards grid ── */}
      {!loading && !error && teachers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher, idx) => {
            const subjectList = resolveSubjects(teacher.subjects);

            return (
              <div
                key={teacher._id ?? idx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {(teacher.name ?? "?")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">
                      {teacher.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {teacher.email ?? "No email"}
                    </p>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                    Subjects Assigned
                  </p>
                  {subjectList.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {subjectList.map((subject) => (
                        <span
                          key={subject}
                          className="bg-teal-50 text-teal-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-teal-100"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 italic">
                      No subjects assigned
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
