import { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000/api";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subjects: [],
  });

  // fetch data
  const fetchData = async () => {
    try {
      const [teacherRes, subjectRes] = await Promise.all([
        axios.get(`${BASE}/teachers`),
        axios.get(`${BASE}/subjects`),
      ]);

      setTeachers(teacherRes.data.data || []);
      setSubjects(subjectRes.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle subject select
  const handleSubjectSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );

    setForm({ ...form, subjects: selectedOptions });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE}/teachers`, form);

      setForm({ name: "", email: "", subjects: [] });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error creating teacher");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-semibold">Teachers</h1>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-medium">Add Teacher</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Teacher Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />

            {/* Multi-select subjects */}
            <select
              multiple
              onChange={handleSubjectSelect}
              className="border border-gray-300 rounded-md px-3 py-2 h-32"
            >
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="md:col-span-3 border text-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 transition-all px-4 py-2 rounded-md font-medium"
            >
              Add Teacher
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-4">All Teachers</h2>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Subjects</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td className="border p-2">{teacher.name}</td>
                    <td className="border p-2">{teacher.email}</td>
                    <td className="border p-2">
                      {teacher.subjects?.length > 0
                        ? teacher.subjects.map((s) => s.name).join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {teachers.length === 0 && (
              <p className="text-gray-500 mt-3 text-sm">
                No teachers found
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}