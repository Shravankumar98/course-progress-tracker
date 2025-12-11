import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse, getCourseProgress, updateLessonStatus } from "../api";
import CircularProgress from "../components/CircularProgress";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchCourse = async () => {
        try {
          const result = await getCourse(id);

          if (!result) {
            console.log("No course found");
            setCourse(null);
          } else {
            setCourse(result);
          }
        } catch (error) {
          console.error("Error:", error.message);
        } finally {
          setLoading(false);
        }
      };
      const fetchCourseProgress = async () => {
        try {
          const result = await getCourseProgress(id);

          if (!result) {
            console.log("No progress found");
            setProgress(null);
          } else {
            setProgress(result.progress);
          }
        } catch (error) {
          console.error("Error:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCourse();
      fetchCourseProgress();
    }
  }, [id]);

  const handleClick = async (id) => {
    try {
      setLoading(true);
      updateLessonStatus(id);
      const updateLessons = course.lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, completed: true } : lesson
      );
      setCourse((prev) => ({ ...prev, lessons: updateLessons }));
    } catch (error) {
      console.error("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="main">
      <header className="header">
        <h1>{course.title}</h1>
        <CircularProgress
          progress={Math.floor(progress)}
          stroke={12}
          size={180}
          color="#ff9800"
        />
      </header>

      <div className="lessons-container">
        {course.lessons.map((lesson) => (
          <div key={lesson.id} className="lesson">
            <h2>{lesson.title}</h2>
            <button
              onClick={() => handleClick(lesson.id)}
              disabled={lesson.completed}
            >
              {lesson.completed ? "Completed" : "Mark Completed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
