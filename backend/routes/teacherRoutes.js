import express from "express";
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.route("/").get(getTeachers).post(createTeacher);
router.route("/:id").delete(deleteTeacher);

export default router;
