const courses = [
  {
    courseId: 1,
    title: "React Basics",
    lessons: [
      { id: 101, title: "Intro" },
      { id: 102, title: "Components" },
      { id: 103, title: "State" },
    ],
  },
  {
    courseId: 2,
    title: "Node",
    lessons: [
      { id: 201, title: "Intro" },
      { id: 202, title: "Express" },
      { id: 203, title: "REST Apis" },
    ],
  },
];

const completedLessons = [101, 103, 203];

export { courses, completedLessons };
