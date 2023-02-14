/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useCourseSchedule = (courseId: string) => {
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSchedule = () => {
    courseClient
      .get('/schedule', { params: { course_id: courseId } })
      .then(response => {
        setCourseSchedule(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error :', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  return [courseSchedule, isLoading];
};

export default useCourseSchedule;
