import { completedLessons } from "../db.js";

const updateLessonStatus = (req, res) => {
  const lessonId = req.params.id;
  if (!completedLessons.includes(Number(lessonId))) {
    completedLessons.push(Number(lessonId));
    res.status(200).json({ message: "Lesson status updated", completedLessons });
  } else {
    res.status(404).json({ message: "Lesson already completed", completedLessons });
  }
};

export { updateLessonStatus };
