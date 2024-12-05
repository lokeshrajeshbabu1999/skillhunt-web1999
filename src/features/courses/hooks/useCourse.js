import React, { useEffect, useState } from "react";
import axiosCourse from "../../../api/axiosCourse";

const useCourse = () => {
  const [course, setCourse] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loadCourse = () => {
    setPending(true);
    axiosCourse
      .get("/course", {

      })
      .then((response) => {
        setCourse(response.data);
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
    loadCourse();
  }, []);
  return [course, pending, isLoading];
};
export default useCourse;
