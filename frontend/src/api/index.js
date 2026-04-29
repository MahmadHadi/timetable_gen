// ─── API Base URL ────────────────────────────────────────────────────────────
const BASE = "http://localhost:5000/api";

// Helper: throws a readable error when the response is not OK
async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = `Server error (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || body.error || message;
    } catch {
      // response wasn't JSON — keep the default message
    }
    throw new Error(message);
  }

  return res.json();
}

// ─── Timetables ──────────────────────────────────────────────────────────────

/** Generate a timetable for a given class name */
export function generateTimetable(className) {
  return request("/timetables/generate", {
    method: "POST",
    body: JSON.stringify({ className }),
  });
}

/** Fetch all stored timetables */
export function fetchTimetables() {
  return request("/timetables");
}

// ─── Subjects ────────────────────────────────────────────────────────────────

/** Fetch all subjects */
export function fetchSubjects() {
  return request("/subjects");
}

// ─── Teachers ────────────────────────────────────────────────────────────────

/** Fetch all teachers */
export function fetchTeachers() {
  return request("/teachers");
}
