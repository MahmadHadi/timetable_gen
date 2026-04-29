# Smart Timetable Generator — Frontend

A clean multi-page React + Vite + Tailwind UI that connects to your backend.

---

## 📁 Project Structure

```
smart-timetable-ui/
├── index.html                  ← HTML shell + Google Fonts
├── package.json
├── vite.config.js              ← Dev server on port 3000
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                ← React entry point
    ├── index.css               ← Tailwind directives + font rule
    ├── App.jsx                 ← Simple state-based router (no library)
    ├── api/
    │   └── index.js            ← All API calls in one place
    ├── components/
    │   ├── Navbar.jsx          ← Sticky nav with active state
    │   ├── TimetableTable.jsx  ← Reusable day × slot grid
    │   └── StatusMessage.jsx   ← Shared loading / error / empty states
    └── pages/
        ├── HomePage.jsx        ← Generate timetable
        ├── SubjectsPage.jsx    ← List all subjects
        ├── TeachersPage.jsx    ← List all teachers
        └── TimetablesPage.jsx  ← Browse stored timetables
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:3000)
npm run dev
```

> Make sure your backend is running at **http://localhost:5000** before using the app.

---

## 🔌 API Contracts

### Generate Timetable
```
POST http://localhost:5000/api/timetables/generate
Body: { "className": "10-A" }

Response:
{
  "timeSlots": ["09:00–10:00", "10:00–11:00", ...],
  "schedule": {
    "Monday":    [{ "subject": "Math",    "teacher": "Mr. Sharma" }, ...],
    "Tuesday":   [...],
    "Wednesday": [...],
    "Thursday":  [...],
    "Friday":    [...]
  }
}
```

### All Timetables
```
GET http://localhost:5000/api/timetables

Response: [
  { "_id": "...", "className": "10-A", "timeSlots": [...], "schedule": {...}, "createdAt": "..." },
  ...
]
```

### Subjects
```
GET http://localhost:5000/api/subjects

Response: [
  { "_id": "...", "name": "Mathematics", "code": "MATH101", "hoursPerWeek": 5 },
  ...
]
```

### Teachers
```
GET http://localhost:5000/api/teachers

Response: [
  { "_id": "...", "name": "Mr. Sharma", "email": "sharma@school.com", "subjects": ["Math", "Physics"] },
  ...
]
```

> If your API returns a different shape, update `src/api/index.js` and the relevant page's data-mapping line.

---

## 🏗 Build for Production

```bash
npm run build   # Output goes to dist/
npm run preview # Preview the production build locally
```
