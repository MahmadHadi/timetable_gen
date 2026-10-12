// Static sample schedule — a showcase only, not a working generator.

const SUBJECTS = {
  math: { short: "Math",  name: "Math", teacher: "Mr. Shah",  tone: "bg-indigo-50 text-indigo-700" },
  phy:  { short: "Phy",   name: "Physics",     teacher: "Ms. Mehta", tone: "bg-sky-50 text-sky-700" },
  chem: { short: "Chem",  name: "Chemistry",   teacher: "Dr. Patel", tone: "bg-emerald-50 text-emerald-700" },
  eng:  { short: "Eng",   name: "English",     teacher: "Ms. Joshi", tone: "bg-amber-50 text-amber-700" },
  cs:   { short: "CS",    name: "Comp Sci", teacher: "Mr. Rao",  tone: "bg-violet-50 text-violet-700" },
  lib:  { short: "Lib",   name: "Library",     teacher: "Free slot", tone: "bg-slate-100 text-slate-500" },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Same five hourly slots the app uses, with the lunch gap after 12:00.
const ROWS = [
  { time: "10:00", cells: ["math", "chem", "eng", "phy", "cs"] },
  { time: "11:00", cells: ["phy", "math", "cs", "chem", "eng"] },
  { time: "12:00", cells: ["eng", "cs", "math", "math", "phy"] },
  { lunch: true },
  { time: "14:00", cells: ["cs", "eng", "phy", "lib", "math"] },
  { time: "15:00", cells: ["chem", "lib", "chem", "eng", "chem"] },
];

export default function TimetablePreview() {
  return (
    <div
      data-preview
      className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-4"
      role="img"
      aria-label="Sample weekly timetable preview"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-slate-900 sm:text-sm">Class A · Weekly timetable</p>
        <span className="mono rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
          sample
        </span>
      </div>

      <div className="grid grid-cols-[2.25rem_repeat(5,minmax(0,1fr))] gap-1 sm:grid-cols-[3rem_repeat(5,minmax(0,1fr))] sm:gap-1.5">
        <div />
        {DAYS.map((d) => (
          <div
            key={d}
            className="pb-1 text-center text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs"
          >
            {d}
          </div>
        ))}

        {ROWS.map((row) =>
          row.lunch ? (
            <div
              key="lunch"
              className="col-span-full border-y border-dashed border-slate-200 py-1 text-center text-[10px] text-slate-400"
            >
              Lunch break
            </div>
          ) : (
            <Row key={row.time} row={row} />
          )
        )}
      </div>
    </div>
  );
}

function Row({ row }) {
  return (
    <>
      <div className="mono flex items-center text-[9px] text-slate-400 sm:text-[11px]">
        {row.time}
      </div>
      {row.cells.map((key, i) => {
        const s = SUBJECTS[key];
        return (
          <div
            key={i}
            data-block
            className={`min-w-0 rounded-md px-1 py-1.5 sm:px-2 sm:py-2 ${s.tone}`}
          >
            <p className="truncate text-[10px] font-semibold sm:text-xs">
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.name}</span>
            </p>
            <p className="hidden truncate text-[10px] opacity-70 sm:block">{s.teacher}</p>
          </div>
        );
      })}
    </>
  );
}
