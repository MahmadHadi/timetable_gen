// import { useState } from "react";

// // ── Layout
// import Navbar from "./components/Navbar.jsx";

// // ── Pages
// import HomePage from "./pages/HomePage.jsx";
// import SubjectsPage from "./pages/SubjectsPage.jsx";
// import TeachersPage from "./pages/TeachersPage.jsx";
// import TimetablesPage from "./pages/TimetablesPage.jsx";
// import LandingPage from "./pages/LandingPage.jsx";

// // ─── Page Registry ────────────────────────────────────────────────────────────
// // Maps a page key → component. Add new pages here.
// const PAGES = {
//   root: <LandingPage />,
//   home: <HomePage />,
//   subjects: <SubjectsPage />,
//   teachers: <TeachersPage />,
//   timetables: <TimetablesPage />,
// };

// // ─── App ──────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [activePage, setActivePage] = useState("/");

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">
//       {/* Sticky navigation bar */}
//       <Navbar activePage={activePage} onNavigate={setActivePage} />

//       {/* Page content */}
//       <main>
//         {PAGES[activePage] ?? (
//           <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
//             Page not found.
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

// ── Layout
import Navbar from "./components/Navbar.jsx";

// ── Pages
import LandingPage from "./pages/LandingPage.jsx";
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

// ─── URL Paths ────────────────────────────────────────────────────────────────
// Keeps the address bar in sync with the active page (still no router library).
const PATHS = {
  landing: "/",
  home: "/generate-timetable",
  timetables: "/timetables",
  subjects: "/subjects",
  teachers: "/teachers",
};

const pageFromPath = (pathname) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return Object.keys(PATHS).find((key) => PATHS[key] === clean) ?? "landing";
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState(() =>
    pageFromPath(window.location.pathname)
  );

  const navigate = (page) => {
    setActivePage(page);
    if (PATHS[page] && window.location.pathname !== PATHS[page]) {
      window.history.pushState({}, "", PATHS[page]);
    }
    window.scrollTo(0, 0);
  };

  // Browser back / forward buttons
  useEffect(() => {
    const onPopState = () => setActivePage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isLanding = activePage === "landing";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sticky navigation bar (the landing page has its own) */}
      {!isLanding && <Navbar activePage={activePage} onNavigate={navigate} />}

      {/* Page content */}
      <main>
        {isLanding ? (
          <LandingPage onNavigate={navigate} />
        ) : PAGES[activePage] ?? (
          <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
            Page not found.
          </div>
        )}
      </main>
    </div>
  );
}