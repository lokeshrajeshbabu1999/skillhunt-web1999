import React, { useEffect, useState } from "react";
import axiosCourse from "../../../api/axiosCourse";

const useCourseSchedule = (course_id) => {
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadCourseSchedule = (course_id) => {
    setPending(true);
    axiosCourse
      .get("/schedule", {
        params: { course_id: course_id },
      })
      .then((response) => {
        const filteredSchedules = response.data.filter(
          (schedule) => schedule.course_id === course_id
        );
        setCourseSchedule(filteredSchedules);
        setPending(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setPending(false);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    loadCourseSchedule(course_id);
  }, [course_id]);
  return [courseSchedule, pending, isLoading];
};
export default useCourseSchedule;
