import { useEffect, useState } from "react";
import { getCourses } from "../api";
import Card from "../components/Card/Card";
import "./styles.css";

const Courses = () => {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getCourses();

        if (!result || result.length === 0) {
          console.log("No Courses found");
          return;
        }
        setCoursesList(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="main">
      <h1>Courses</h1>
      <div className="course-container">
        {coursesList.length === 0
          ? "...Loading Courses"
          : coursesList.map((course) => (
              <Card
                key={course.courseId}
                id={course.courseId}
                title={course.title}
                lessons={course.lessons}
                progress={course.progress}
              />
            ))}
      </div>
    </div>
  );
};

export default Courses;
