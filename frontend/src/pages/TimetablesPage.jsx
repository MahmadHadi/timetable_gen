import { useEffect, useState } from "react";
import axios from "axios";
import TimetableTable from "../components/TimetableTable.jsx";

const BASE = "http://localhost:5000/api";

export default function TimetablesPage() {
  const [timetables, setTimetables] = useState([]);
  const [selected, setSelected] = useState(null);

  // fetch timetables
  const fetchTimetables = async () => {
    try {
      const res = await axios.get(`${BASE}/timetables`);
      setTimetables(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-semibold">Saved Timetables</h1>

        {/* List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-3">
          <h2 className="text-lg font-medium">All Timetables</h2>

          {timetables.length === 0 && (
            <p className="text-gray-500 text-sm">No timetables found</p>
          )}

          <div className="flex flex-wrap gap-3">
            {timetables.map((tt) => (
              <button
                key={tt._id}
                onClick={() => setSelected(tt)}
                className={`px-4 py-2 rounded-md border transition-all ${
                  selected?._id === tt._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {tt.className}
              </button>
            ))}
          </div>
        </div>

        {/* Display */}
        {selected && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">
            <h2 className="text-lg font-semibold">
              Timetable: {selected.className}
            </h2>

            <TimetableTable slots={selected.slots} />
          </div>
        )}

      </div>
    </div>
  );
}