import Timetable from "../models/Timetable.js";
import Subject from "../models/Subject.js";
import Teacher from "../models/Teacher.js";
import {
  generateMultiClassTimetable
} from "../utils/timetableGenerator.js";

export const generateMultiClass = async (req, res) => {
  try {
    const { classes } = req.body;

    if (!classes || classes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Classes array required",
      });
    }

    const subjects = await Subject.find();
    const teachers = await Teacher.find();

    const data = generateMultiClassTimetable(classes, subjects, teachers);

    // save each timetable
    for (const className of classes) {
      await Timetable.create({
        className,
        slots: data[className].slots,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc  Get all timetables
// @route GET /api/timetables
export const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate("slots.subject", "name code")
      .populate("slots.teacher", "name email");
    res.status(200).json({ success: true, data: timetables });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single timetable
// @route GET /api/timetables/:id
export const getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id)
      .populate("slots.subject", "name code")
      .populate("slots.teacher", "name email");
    if (!timetable) {
      return res
        .status(404)
        .json({ success: false, message: "Timetable not found" });
    }
    res.status(200).json({ success: true, data: timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create a timetable
// @route POST /api/timetables
export const createTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.create(req.body);
    res.status(201).json({ success: true, data: timetable });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Delete a timetable
// @route DELETE /api/timetables/:id
export const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) {
      return res
        .status(404)
        .json({ success: false, message: "Timetable not found" });
    }
    res.status(200).json({ success: true, message: "Timetable deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Generate Timetable ───────────────────────────────────────────────────────

// @desc  Auto-generate a weekly timetable for a class (does NOT save to DB)
// @route POST /api/timetables/generate
// @body  { className: "IT Sem 5" }
export const generateTimetable = async (req, res) => {
  try {
    const { className } = req.body;

    if (!className || !className.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "className is required." });
    }

    // ── 1. Load data from DB ─────────────────────────────────────────────────
    const [subjects, teachers] = await Promise.all([
      Subject.find(),
      Teacher.find().populate("subjects", "_id"),
    ]);

    if (subjects.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No subjects found in the database.",
        });
    }

    if (teachers.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No teachers found in the database.",
        });
    }

    // ── 2. Run the generation algorithm ─────────────────────────────────────
    const { slots, warnings } = generateMultiClassTimetable(subjects, teachers);

    if (slots.length === 0) {
      return res.status(422).json({
        success: false,
        message:
          "Could not generate any slots. Check teacher–subject assignments.",
        warnings,
      });
    }

    // ── 3. Shape the response ────────────────────────────────────────────────
    // Inline populate: replace Mongoose docs with plain readable objects
    // so the response matches the Timetable model's populated shape.
    const readableSlots = slots.map(
      ({ day, startTime, endTime, subject, teacher }) => ({
        day,
        startTime,
        endTime,
        subject: {
          _id: subject._id,
          name: subject.name,
          code: subject.code,
        },
        teacher: {
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
        },
      }),
    );

    return res.status(200).json({
      success: true,
      data: {
        className: className.trim(),
        slots: readableSlots,
      },
      ...(warnings.length > 0 && { warnings }), // include only when non-empty
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
