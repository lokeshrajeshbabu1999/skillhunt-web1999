import { useEffect, useState } from "react";
import axiosCourse from "../../../api/axiosCourse";

const useCourseDetail = (course_id) => {
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loadCourseDetail = (course_id) => {
    setIsLoading(true);
    axiosCourse
      .get("/course", {
        params: { course_id: course_id },
      })
      .then((response) => {
        setCourse(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (course_id) {
      loadCourseDetail(course_id);
    }
  }, [course_id]);

  return [course, isLoading];
};

export default useCourseDetail;
