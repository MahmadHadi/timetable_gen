// Primary "Generate Timetable" call-to-action.
// Renders a real link (so it works with middle-click / copy-link) but hands
// plain clicks to the app's state-based navigation.
const SIZES = {
  md: "h-10 px-3.5 sm:px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function CtaButton({ onNavigate, size = "md", className = "" }) {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate("home");
  };

  return (
    <a
      href="/generate-timetable"
      onClick={handleClick}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transition-none motion-reduce:hover:transform-none ${SIZES[size]} ${className}`}
    >
      Generate Timetable
    </a>
  );
}
