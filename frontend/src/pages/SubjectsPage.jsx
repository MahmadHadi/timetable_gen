import { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000/api";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    hoursPerWeek: "",
  });

  // fetch subjects
  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${BASE}/subjects`);
      setSubjects(res.data.data);
      console.log("res", res.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE}/subjects`, {
        name: form.name,
        code: form.code,
        hoursPerWeek: Number(form.hoursPerWeek),
      });

      setForm({ name: "", code: "", hoursPerWeek: "" });
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Error creating subject");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-semibold">Subjects</h1>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-medium">Add Subject</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <input
              type="text"
              name="name"
              placeholder="Subject Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />

            <input
              type="text"
              name="code"
              placeholder="Subject Code"
              value={form.code}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />

            <input
              type="number"
              name="hoursPerWeek"
              placeholder="Hours / Week"
              value={form.hoursPerWeek}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />

            <button
              type="submit"
              className="md:col-span-3 border text-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 transition-all px-4 py-2 rounded-md font-medium"
            >
              Add Subject
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-4">All Subjects</h2>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Code</th>
                  <th className="border p-2 text-left">Hours</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => (
                  <tr key={sub._id}>
                    <td className="border p-2">{sub.name}</td>
                    <td className="border p-2">{sub.code}</td>
                    <td className="border p-2">{sub.hoursPerWeek}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {subjects.length === 0 && (
              <p className="text-gray-500 mt-3 text-sm">
                No subjects found
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}