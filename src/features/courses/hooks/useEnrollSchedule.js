import React, { useEffect, useState } from "react";
import axiosCourse from "../../../api/axiosCourse";

const useEnrollSchedule = (schedule_id) => {
  const [enrollSchedule, setEnrollSchedule] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadCourseSchedule = (schedule_id) => {
    setPending(true);
    axiosCourse
      .get("/schedule", {
        params: { schedule_id: schedule_id },
      })
      .then((response) => {
        setEnrollSchedule(response.data);
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
    loadCourseSchedule(schedule_id);
  }, [schedule_id]);

  return [enrollSchedule, pending, isLoading];
};
export default useEnrollSchedule;
