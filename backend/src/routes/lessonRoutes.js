import { Router } from "express";

import {
  updateLessonStatus,
} from "../controllers/lessonController.js";

const router = Router();
router.post("/:id/complete", updateLessonStatus);

export default router;
