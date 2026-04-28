import Teacher from "../models/Teacher.js";

// @desc  Get all teachers
// @route GET /api/teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("subjects", "name code");
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create a teacher
// @route POST /api/teachers
export const createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Delete a teacher
// @route DELETE /api/teachers/:id
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    res.status(200).json({ success: true, message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
