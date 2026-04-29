import { useState } from "react";

// ── Layout
import Navbar from "./components/Navbar.jsx";

// ── Pages
import HomePage from "./pages/HomePage.jsx";
import SubjectsPage from "./pages/SubjectsPage.jsx";
import TeachersPage from "./pages/TeachersPage.jsx";
import TimetablesPage from "./pages/TimetablesPage.jsx";

// ─── Page Registry ────────────────────────────────────────────────────────────
// Maps a page key → component. Add new pages here.
const PAGES = {
  home: <HomePage />,
  subjects: <SubjectsPage />,
  teachers: <TeachersPage />,
  timetables: <TimetablesPage />,
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sticky navigation bar */}
      <Navbar activePage={activePage} onNavigate={setActivePage} />

      {/* Page content */}
      <main>
        {PAGES[activePage] ?? (
          <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
            Page not found.
          </div>
        )}
      </main>
    </div>
  );
}
