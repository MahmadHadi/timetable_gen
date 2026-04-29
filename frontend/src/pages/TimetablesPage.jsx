// import { useEffect, useState } from "react";
// import { fetchTimetables } from "../api/index.js";
// import TimetableTable from "../components/TimetableTable.jsx";
// import StatusMessage from "../components/StatusMessage.jsx";

// // ─── Timetables Page ──────────────────────────────────────────────────────────
// // Fetches all stored timetables from GET /api/timetables and shows each one
// // in a collapsible card with a full TimetableTable inside.
// //
// // Expected item shape:
// //   { _id, className, timeSlots: [...], schedule: { Monday: [...], ... } }

// export default function TimetablesPage() {
//   const [timetables, setTimetables] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [openId, setOpenId] = useState(null); // which card is expanded

//   useEffect(() => {
//     fetchTimetables()
//       .then((data) =>
//         setTimetables(Array.isArray(data) ? data : (data.timetables ?? [])),
//       )
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   function toggleCard(id) {
//     setOpenId((prev) => (prev === id ? null : id));
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* ── Page header ── */}
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Stored Timetables
//           </h1>
//           <p className="text-slate-500 mt-1 text-sm">
//             All previously generated timetables. Click a card to expand.
//           </p>
//         </div>
//         {!loading && !error && (
//           <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
//             {timetables.length} timetables
//           </span>
//         )}
//       </div>

//       {/* ── States ── */}
//       {loading && (
//         <StatusMessage type="loading" message="Loading timetables…" />
//       )}
//       {!loading && error && <StatusMessage type="error" message={error} />}
//       {!loading && !error && timetables.length === 0 && (
//         <StatusMessage
//           type="empty"
//           message="No timetables stored yet. Generate one from the Home page."
//         />
//       )}

//       {/* ── Accordion list ── */}
//       {!loading && !error && timetables.length > 0 && (
//         <div className="flex flex-col gap-3">
//           {timetables.map((tt, idx) => {
//             const id = tt._id ?? idx;
//             const isOpen = openId === id;
//             const slots = tt.timeSlots ?? [];
//             const schedule = tt.schedule ?? {};

//             return (
//               <div
//                 key={id}
//                 className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
//               >
//                 {/* ── Card header (always visible) ── */}
//                 <button
//                   onClick={() => toggleCard(id)}
//                   className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     {/* Color dot */}
//                     <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
//                     <div>
//                       <p className="font-semibold text-slate-800">
//                         {tt.className ?? "Unknown Class"}
//                       </p>
//                       <p className="text-xs text-slate-400 mt-0.5">
//                         {slots.length} slots · 5 days
//                         {tt.createdAt
//                           ? ` · ${new Date(tt.createdAt).toLocaleDateString()}`
//                           : ""}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Chevron */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className={`w-4 h-4 text-slate-400 transition-transform ${
//                       isOpen ? "rotate-180" : ""
//                     }`}
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <polyline points="6 9 12 15 18 9" />
//                   </svg>
//                 </button>

//                 {/* ── Expanded timetable ── */}
//                 {isOpen && (
//                   <div className="border-t border-slate-100 px-5 py-5">
//                     {slots.length > 0 ? (
//                       <TimetableTable timeSlots={slots} schedule={schedule} />
//                     ) : (
//                       <p className="text-slate-400 text-sm italic">
//                         No schedule data available for this timetable.
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { fetchTimetables } from "../api/index.js";
import TimetableTable from "../components/TimetableTable.jsx";
import StatusMessage from "../components/StatusMessage.jsx";

// ─── Timetables Page ──────────────────────────────────────────────────────────
// Fetches all stored timetables from GET /api/timetables and shows each one
// in a collapsible card with a full TimetableTable inside.
//
// Expected item shape:
//   { _id, className, timeSlots: [...], schedule: { Monday: [...], ... } }

export default function TimetablesPage() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [openId, setOpenId]         = useState(null); // which card is expanded

  useEffect(() => {
    fetchTimetables()
      .then((response) => {
        // DEBUG: inspect the full API response in the browser console
        console.log("Timetables API response:", response);

        // Actual shape: { success: true, data: [...] }
        const list = response.data;
        setTimetables(Array.isArray(list) ? list : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function toggleCard(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Page header ── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Stored Timetables</h1>
          <p className="text-slate-500 mt-1 text-sm">
            All previously generated timetables. Click a card to expand.
          </p>
        </div>
        {!loading && !error && (
          <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
            {timetables.length} timetables
          </span>
        )}
      </div>

      {/* ── States ── */}
      {loading && <StatusMessage type="loading" message="Loading timetables…" />}
      {!loading && error && <StatusMessage type="error" message={error} />}
      {!loading && !error && timetables.length === 0 && (
        <StatusMessage
          type="empty"
          message="No timetables stored yet. Generate one from the Home page."
        />
      )}

      {/* ── Accordion list ── */}
      {!loading && !error && timetables.length > 0 && (
        <div className="flex flex-col gap-3">
          {timetables.map((tt, idx) => {
            const id       = tt._id ?? idx;
            const isOpen   = openId === id;
            const slots    = tt.slots ?? [];       // API returns "slots", not "timeSlots"
            const schedule = tt.schedule ?? {};

            return (
              <div
                key={id}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
              >
                {/* ── Card header (always visible) ── */}
                <button
                  onClick={() => toggleCard(id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Color dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {tt.className ?? "Unknown Class"}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {slots.length} slots · 5 days
                        {tt.createdAt
                          ? ` · ${new Date(tt.createdAt).toLocaleDateString()}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Chevron */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* ── Expanded timetable ── */}
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-5">
                    {slots.length > 0 ? (
                      <TimetableTable timeSlots={slots} schedule={schedule} />
                    ) : (
                      <p className="text-slate-400 text-sm italic">
                        No schedule data available for this timetable.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}