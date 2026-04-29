// import { useState } from "react";
// import { generateTimetable } from "../api/index.js";
// import TimetableTable from "../components/TimetableTable.jsx";
// import StatusMessage from "../components/StatusMessage.jsx";

// // ─── Home Page ────────────────────────────────────────────────────────────────
// // Lets the user type a class name and generate its timetable via the API.

// export default function HomePage() {
//   const [className, setClassName] = useState("");
//   const [result, setResult]       = useState(null);   // { timeSlots, schedule }
//   const [loading, setLoading]     = useState(false);
//   const [error, setError]         = useState("");

//   async function handleGenerate() {
//     const trimmed = className.trim();
//     if (!trimmed) {
//       setError("Please enter a class name before generating.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const data = await generateTimetable(trimmed);
//       // Expected shape: { timeSlots: [...], schedule: { Monday: [...], ... } }
//       setResult({
//         timeSlots: data.timeSlots ?? [],
//         schedule:  data.schedule  ?? data,
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">

//       {/* ── Page header ── */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-slate-800">Generate Timetable</h1>
//         <p className="text-slate-500 mt-1 text-sm">
//           Enter a class name to auto-generate its weekly schedule.
//         </p>
//       </div>

//       {/* ── Input card ── */}
//       <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8 max-w-lg">
//         <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
//           Class Name
//         </label>
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={className}
//             onChange={(e) => setClassName(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
//             placeholder="e.g. 10-A, CSE-3rd, B.Com"
//             className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
//           />
//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//           >
//             {loading ? "Generating…" : "Generate Timetable"}
//           </button>
//         </div>
//       </div>

//       {/* ── States ── */}
//       {loading && (
//         <StatusMessage type="loading" message="Generating timetable, please wait…" />
//       )}

//       {!loading && error && (
//         <StatusMessage type="error" message={error} />
//       )}

//       {/* ── Result ── */}
//       {!loading && result && (
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="font-semibold text-slate-700">
//               Timetable for{" "}
//               <span className="text-teal-600">{className}</span>
//             </h2>
//             <span className="text-xs text-slate-400 mono">
//               {result.timeSlots.length} slots · 5 days
//             </span>
//           </div>
//           <TimetableTable
//             timeSlots={result.timeSlots}
//             schedule={result.schedule}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { generateTimetable } from "../api/index.js";
import TimetableTable from "../components/TimetableTable.jsx";
import StatusMessage from "../components/StatusMessage.jsx";

// ─── Home Page ────────────────────────────────────────────────────────────────
// Lets the user type a class name and generate its timetable via the API.

export default function HomePage() {
  const [className, setClassName] = useState("");
  const [result, setResult]       = useState(null);   // { timeSlots, schedule }
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  async function handleGenerate() {
    const trimmed = className.trim();
    if (!trimmed) {
      setError("Please enter a class name before generating.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await generateTimetable(trimmed);

      // DEBUG: inspect the full API response in the browser console
      console.log("API response:", response);

      // Actual shape: { success: true, data: { className, slots, schedule } }
      const timetableData = response.data;

      setResult({
        timeSlots: timetableData.slots    ?? [],
        schedule:  timetableData.schedule ?? {},
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Page header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Generate Timetable</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Enter a class name to auto-generate its weekly schedule.
        </p>
      </div>

      {/* ── Input card ── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8 max-w-lg">
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Class Name
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g. 10-A, CSE-3rd, B.Com"
            className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "Generating…" : "Generate Timetable"}
          </button>
        </div>
      </div>

      {/* ── States ── */}
      {loading && (
        <StatusMessage type="loading" message="Generating timetable, please wait…" />
      )}

      {!loading && error && (
        <StatusMessage type="error" message={error} />
      )}

      {/* ── Result ── */}
      {!loading && result && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-700">
              Timetable for{" "}
              <span className="text-teal-600">{className}</span>
            </h2>
            <span className="text-xs text-slate-400 mono">
              {result.timeSlots?.length ?? 0} slots · 5 days
            </span>
          </div>
          <TimetableTable
            timeSlots={result.timeSlots}
            schedule={result.schedule}
          />
        </div>
      )}
    </div>
  );
}