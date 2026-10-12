import { GITHUB_URL } from "./LandingNav.jsx";

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <span className="font-medium text-slate-700">Timetable Generator</span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-slate-900"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
