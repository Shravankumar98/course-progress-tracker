import { courses, completedLessons } from "../db.js";

const getCourses = (_req, res) => {
  const coursesWithProgress = courses.map((course) => {
    const completedLessonsCount = course.lessons.reduce(
      (count, lesson) =>
        completedLessons.includes(lesson.id) ? count + 1 : count,
      0
    );
    const progress = (completedLessonsCount / course.lessons.length) * 100;
    return { ...course, progress };
  });
  res.status(200).json(coursesWithProgress);
};

const getCourseById = (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.courseId === courseId);
  if (course) {
    const courseWithCompletedLessons = course.lessons.map((lesson) => ({
      ...lesson,
      completed: completedLessons.includes(lesson.id),
    }));
    res.status(200).json({ ...course, lessons: courseWithCompletedLessons });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const getCourseProgressById = (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.courseId === courseId);
  if (course) {
    const completedLessonsCount = course.lessons.reduce(
      (count, lesson) =>
        completedLessons.includes(lesson.id) ? count + 1 : count,
      0
    );
    const progress = (completedLessonsCount / course.lessons.length) * 100;
    res.status(200).json({ progress });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

export { getCourses, getCourseById, getCourseProgressById };
