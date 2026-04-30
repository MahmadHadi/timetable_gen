import express from "express";
import {
  getTimetables,
  getTimetableById,
  createTimetable,
  deleteTimetable,
  generateTimetable,
  generateMultiClass,
} from "../controllers/timetableController.js";

const router = express.Router();

router.route("/").get(getTimetables).post(createTimetable);

router.post("/generate-multi", generateMultiClass);
// NOTE: /generate must be declared BEFORE /:id
// otherwise Express would treat the string "generate" as an id parameter.
router.route("/generate").post(generateTimetable);

router.route("/:id").get(getTimetableById).delete(deleteTimetable);

export default router;
