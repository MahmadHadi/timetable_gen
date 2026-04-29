// ─── Navbar ───────────────────────────────────────────────────────────────────
// Props:
//   activePage  (string)  – current page key
//   onNavigate  (fn)      – called with the new page key when a link is clicked

const NAV_LINKS = [
  { key: "home",       label: "Generate" },
  { key: "timetables", label: "Timetables" },
  { key: "subjects",   label: "Subjects" },
  { key: "teachers",   label: "Teachers" },
];

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">

        {/* Brand */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-teal-700 font-bold text-lg tracking-tight hover:text-teal-600 transition-colors"
        >
          {/* Calendar icon (inline SVG — no library needed) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          SmartTT
        </button>

        {/* Links */}
        <ul className="flex items-center gap-1">
          {NAV_LINKS.map(({ key, label }) => {
            const isActive = activePage === key;
            return (
              <li key={key}>
                <button
                  onClick={() => onNavigate(key)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
