import { useState } from "react";
import { generateTimetable } from "../api/index.js";
import TimetableTable from "../components/TimetableTable.jsx";

export default function HomePage() {
  const [classes, setClasses] = useState([""]);
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...classes];
    updated[index] = value;
    setClasses(updated);
  };

  const addClass = () => {
    setClasses([...classes, ""]);
  };

  const handleGenerate = async () => {
    const filtered = classes.filter((c) => c.trim() !== "");

    if (filtered.length === 0) return alert("Enter at least one class");

    try {
      setLoading(true);
      const res = await generateTimetable({ classes: filtered });
      setTimetableData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate timetable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-semibold">Smart Timetable Generator</h1>
          <p className="text-gray-500">
            Conflict-free scheduling system
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">

          <h2 className="text-lg font-medium">Enter Classes</h2>

          {classes.map((cls, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Class ${index + 1}`}
              value={cls}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}

          <div className="flex gap-3">
            <button
              onClick={addClass}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm"
            >
              + Add Class
            </button>

            <button
              onClick={handleGenerate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
            >
              {loading ? "Generating..." : "Generate Timetable"}
            </button>
          </div>
        </div>

        {/* Output */}
        {timetableData && (
          <div className="space-y-6">
            {Object.keys(timetableData).map((className) => (
              <div
                key={className}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4"
              >
                <h2 className="text-lg font-semibold">{className}</h2>

                <TimetableTable slots={timetableData[className].slots} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}