import { Router } from "express";

import {
  getCourses,
  getCourseById,
  getCourseProgressById,
} from "../controllers/courseController.js";

const router = Router();
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.get("/:id/progress", getCourseProgressById);

export default router;
