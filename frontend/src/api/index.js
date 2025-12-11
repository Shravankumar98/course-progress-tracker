import axios from "axios";

const url = "http://localhost:3000/api/";
const courseRoute = "courses";
const lessonRoute = "lessons";

const getCourses = async () => {
  try {
    const response = await axios.get(url + courseRoute);
    const result = response.data;
    return result;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

const getCourse = async (id) => {
  try {
    const response = await axios.get(`${url}${courseRoute}/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
const getCourseProgress = async (id) => {
  try {
    const response = await axios.get(`${url}${courseRoute}/${id}/progress`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

const updateLessonStatus = async (id) => {
  try {
    const response = await axios.post(`${url}${lessonRoute}/${id}/complete`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export { getCourses, getCourse, getCourseProgress, updateLessonStatus };
