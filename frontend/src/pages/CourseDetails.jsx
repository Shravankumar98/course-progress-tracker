import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse, getCourseProgress, updateLessonStatus } from "../api";
import CircularProgress from "../components/CircularProgress/CircularProgress";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Run both API calls in parallel
        const [courseData, progressData] = await Promise.all([
          getCourse(id),
          getCourseProgress(id),
        ]);

        // Handle course
        if (!courseData) {
          setCourse(null);
        } else {
          setCourse(courseData);
        }

        // Handle progress
        setProgress(progressData?.progress ?? 0);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = async (lessonId) => {
    try {
      setLoading(true);
      await updateLessonStatus(lessonId);

      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.map((lesson) =>
          lesson.id === lessonId
            ? { ...lesson, completed: true }
            : lesson
        ),
      }));

      const progressData = await getCourseProgress(id);
      setProgress(progressData.progress);
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
