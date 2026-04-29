import { useEffect, useState } from "react";
import { fetchSubjects } from "../api/index.js";
import StatusMessage from "../components/StatusMessage.jsx";

// ─── Subjects Page ────────────────────────────────────────────────────────────
// Fetches and displays all subjects from GET /api/subjects.
//
// Expected subject shape:
//   { _id, name, code, hoursPerWeek }

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetchSubjects()
      .then((data) => setSubjects(Array.isArray(data) ? data : data.subjects ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Page header ── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Subjects</h1>
          <p className="text-slate-500 mt-1 text-sm">
            All subjects registered in the system.
          </p>
        </div>
        {!loading && !error && (
          <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
            {subjects.length} subjects
          </span>
        )}
      </div>

      {/* ── States ── */}
      {loading && <StatusMessage type="loading" message="Loading subjects…" />}
      {!loading && error && <StatusMessage type="error" message={error} />}
      {!loading && !error && subjects.length === 0 && (
        <StatusMessage type="empty" message="No subjects found." />
      )}

      {/* ── Table ── */}
      {!loading && !error && subjects.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-sm border-collapse bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                  #
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                  Subject Name
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                  Code
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                  Hours / Week
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => (
                <tr
                  key={subject._id ?? idx}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="px-5 py-3 text-slate-400 mono text-xs">
                    {idx + 1}
                  </td>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {subject.name ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className="mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
                      {subject.code ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {subject.hoursPerWeek ?? subject.hours_per_week ?? "—"}
                    {(subject.hoursPerWeek || subject.hours_per_week) ? (
                      <span className="text-slate-400 text-xs ml-1">hrs</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
