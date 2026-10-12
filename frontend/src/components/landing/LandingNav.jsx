import CtaButton from "./CtaButton.jsx";

export const GITHUB_URL = "https://github.com/MahmadHadi/timetable_gen";

export default function LandingNav({ onNavigate, onScrollToFeatures }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Text-based brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0 });
          }}
          className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-slate-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="truncate text-sm sm:text-base">Timetable Generator</span>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
            <a
              href="#features"
              onClick={onScrollToFeatures}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              Features
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              GitHub
            </a>
          </nav>
          <CtaButton onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}
