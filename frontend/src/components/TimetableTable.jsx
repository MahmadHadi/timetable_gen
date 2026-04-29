// // ─── TimetableTable ───────────────────────────────────────────────────────────
// // Reusable component that renders a day × time-slot grid.
// //
// // Props:
// //   timeSlots  (string[])  – column headers, e.g. ["09:00–10:00", ...]
// //   schedule   (object)    – { Monday: [{subject, teacher}, ...], Tuesday: [...], ... }
// //
// // The component gracefully handles missing cells (shows "—").

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// // Soft background colors cycled per subject to make the table easier to scan
// const CELL_COLORS = [
//   "bg-teal-50 text-teal-800",
//   "bg-sky-50 text-sky-800",
//   "bg-violet-50 text-violet-800",
//   "bg-amber-50 text-amber-800",
//   "bg-rose-50 text-rose-800",
//   "bg-emerald-50 text-emerald-800",
// ];

// function formatSchedule(schedule, timeSlots) {
//   const result = {};

//   DAYS.forEach((day) => {
//     result[day] = new Array(timeSlots.length).fill(null);
//   });

//   (schedule?.slots || []).forEach((slot) => {
//     const day = slot.day;

//     // find index of time slot
//     const normalize = (str) => str.replace("–", "-");

//     const slotLabel = normalize(`${slot.startTime}-${slot.endTime}`);
//     const index = timeSlots.findIndex((t) => normalize(t) === slotLabel);
//     // const slotLabel = `${slot.startTime}–${slot.endTime}`;
//     // const index = timeSlots.indexOf(slotLabel);

//     // if (index !== -1) {
//     //   result[day][index] = {
//     //     subject: slot.subject?.name,
//     //     teacher: slot.teacher?.name,
//     //   };
//     // }
//     if (index !== -1 && result[day]) {
//       result[day][index] = {
//         subject: slot.subject?.name,
//         teacher: slot.teacher?.name,
//       };
//     }
//   });

//   return result;
// }

// // Assign a stable color index to each unique subject name
// function buildColorMap(schedule) {
//   console.log("schedule", schedule);
//   const map = {};
//   let idx = 0;

//   (schedule?.slots || []).forEach((cell) => {
//     if (cell?.subject?.name && !(cell.subject.name in map)) {
//       map[cell.subject.name] = CELL_COLORS[idx % CELL_COLORS.length];
//       idx++;
//     }
//   });

//   return map;
// }
// export default function TimetableTable({ timeSlots = [], schedule = {} }) {
//   const formattedSchedule = formatSchedule(schedule, timeSlots);

//   const colorMap = buildColorMap(schedule);
//   if (!timeSlots.length) {
//     return (
//       <p className="text-slate-400 text-sm italic">No time slots available.</p>
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
//       <table className="min-w-full text-sm border-collapse">
//         {/* ── Head ── */}
//         <thead className="bg-slate-50">
//           <tr>
//             {/* Day column header */}
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-r border-slate-200 w-28">
//               Day
//             </th>
//             {timeSlots.map((slot) => (
//               <th
//                 key={slot}
//                 className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-r border-slate-200 last:border-r-0 whitespace-nowrap"
//               >
//                 {slot}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         {/* ── Body ── */}
//         <tbody className="bg-white">
//           {DAYS.map((day, di) => (
//             <tr
//               key={day}
//               className={di % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
//             >
//               {/* Day label */}
//               <td className="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-widest border-r border-b border-slate-200 whitespace-nowrap">
//                 {day}
//               </td>

//               {/* Subject cells */}
//               {timeSlots.map((slot, si) => {
//                 const cell = formattedSchedule?.[day]?.[si];
//                 const hasContent = cell?.subject || cell?.teacher;

//                 return (
//                   <td
//                     key={slot}
//                     className="px-2 py-2 border-r border-b border-slate-200 last:border-r-0 align-top min-w-[110px]"
//                   >
//                     {hasContent ? (
//                       <div
//                         className={`rounded-lg px-2.5 py-1.5 ${
//                           colorMap[cell.subject] ??
//                           "bg-slate-100 text-slate-700"
//                         }`}
//                       >
//                         <p className="font-semibold text-xs leading-tight">
//                           {cell.subject ?? "—"}
//                         </p>
//                         {cell.teacher && (
//                           <p className="text-[10px] mt-0.5 opacity-70 leading-tight">
//                             {cell.teacher}
//                           </p>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-slate-300 text-xs px-1">—</span>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// ─── TimetableTable ───────────────────────────────────────────────────────────
// Reusable component that renders a day × time-slot grid.
//
// Props:
//   timeSlots  (object[])  – flat array of slot objects from the API:
//                            [{ day, startTime, subject: { name }, teacher: { name } }, ...]
//   schedule   (object)    – unused after API shape change; kept for prop compat
//
// The component gracefully handles missing cells (shows "—").

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Soft background colors cycled per subject to make the table easier to scan
const CELL_COLORS = [
  "bg-teal-50 text-teal-800",
  "bg-sky-50 text-sky-800",
  "bg-violet-50 text-violet-800",
  "bg-amber-50 text-amber-800",
  "bg-rose-50 text-rose-800",
  "bg-emerald-50 text-emerald-800",
];

// Assign a stable color index to each unique subject name
function buildColorMap(slots) {
  const map = {};
  let idx = 0;
  (slots || []).forEach((slot) => {
    const name = slot?.subject?.name;
    if (name && !(name in map)) {
      map[name] = CELL_COLORS[idx % CELL_COLORS.length];
      idx++;
    }
  });
  return map;
}

export default function TimetableTable({ timeSlots = [], schedule = {} }) {
  // DEBUG: inspect incoming slot objects in the browser console
  console.log("slots:", timeSlots);

  // Derive sorted unique time strings for column headers from the slot objects
  // e.g. ["09:00", "10:00", ...] — these are plain strings, safe as keys + JSX children
  const uniqueTimes = [...new Set(timeSlots.map((s) => s.startTime))].sort();

  const colorMap = buildColorMap(timeSlots);

  if (!uniqueTimes.length) {
    return (
      <p className="text-slate-400 text-sm italic">No time slots available.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="min-w-full text-sm border-collapse">
        {/* ── Head ── */}
        <thead className="bg-slate-50">
          <tr>
            {/* Day column header */}
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-r border-slate-200 w-28">
              Day
            </th>
            {/* FIX: key and children are now plain strings (slot.startTime), not objects */}
            {uniqueTimes.map((time) => (
              <th
                key={time}
                className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-r border-slate-200 last:border-r-0 whitespace-nowrap"
              >
                {time}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody className="bg-white">
          {DAYS.map((day, di) => (
            <tr
              key={day}
              className={di % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
            >
              {/* Day label */}
              <td className="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-widest border-r border-b border-slate-200 whitespace-nowrap">
                {day}
              </td>

              {/* Subject cells */}
              {uniqueTimes.map((time) => {
                // FIX: match slot by day + startTime instead of using array index
                const cell = timeSlots.find(
                  (s) => s.day === day && s.startTime === time
                );

                // FIX: subject and teacher are objects — read .name from each
                const subjectName = cell?.subject?.name;
                const teacherName = cell?.teacher?.name;
                const hasContent  = subjectName || teacherName;

                return (
                  // FIX: key is a composite string, never an object
                  <td
                    key={`${day}-${time}`}
                    className="px-2 py-2 border-r border-b border-slate-200 last:border-r-0 align-top min-w-[110px]"
                  >
                    {hasContent ? (
                      <div
                        className={`rounded-lg px-2.5 py-1.5 ${
                          colorMap[subjectName] ?? "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {/* FIX: render the .name string, not the subject object */}
                        <p className="font-semibold text-xs leading-tight">
                          {subjectName ?? "—"}
                        </p>
                        {teacherName && (
                          <p className="text-[10px] mt-0.5 opacity-70 leading-tight">
                            {teacherName}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-300 text-xs px-1">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}