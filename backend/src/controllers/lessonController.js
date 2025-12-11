import { completedLessons } from "../db.js";

const updateLessonStatus = (req, res) => {
  const lessonId = req.params.id;
  if (!completedLessons.includes(Number(lessonId))) {
    completedLessons.push(Number(lessonId));
    res.json({ message: "Lesson status updated", completedLessons });
  } else {
    res.json({ message: "Lesson already completed", completedLessons });
  }
};

export { updateLessonStatus };
