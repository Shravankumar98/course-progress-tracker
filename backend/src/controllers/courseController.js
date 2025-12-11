import { courses, completedLessons } from "../db.js";

const getCourses = (_req, res) => {
  res.json(courses);
};

const getCourseById = (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.courseId === courseId);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const getCourseProgressById = (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.courseId === courseId);
  if (course) {
    const completedLessonsCount = course.lessons.reduce(
      (count, lesson) => completedLessons.includes(lesson.id) && count + 1,
      0
    );
    const progress = (completedLessonsCount / course.lessons.length) * 100;
    res.json({ progress });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

export { getCourses, getCourseById, getCourseProgressById };
