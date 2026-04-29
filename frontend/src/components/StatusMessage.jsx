// ─── StatusMessage ────────────────────────────────────────────────────────────
// Small helper to render loading / error / empty states consistently.
//
// Props:
//   type     ("loading" | "error" | "empty")
//   message  (string)

export default function StatusMessage({ type, message }) {
  const styles = {
    loading: "bg-slate-50 text-slate-500 border-slate-200",
    error:   "bg-red-50 text-red-600 border-red-200",
    empty:   "bg-slate-50 text-slate-400 border-slate-200",
  };

  const icons = {
    loading: (
      // Spinning circle
      <svg
        className="animate-spin w-4 h-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
        <path fill="currentColor" className="opacity-75"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
      </svg>
    ),
    error: <span className="text-base shrink-0">⚠</span>,
    empty: <span className="text-base shrink-0">📭</span>,
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-sm font-medium ${styles[type]}`}
    >
      {icons[type]}
      {message}
    </div>
  );
}
