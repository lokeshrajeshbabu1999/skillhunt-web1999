/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useCourseDetail = (courseId: number) => {
  const [courseDetail, setCourseDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadCourse = () => {
    setIsLoading(true);
    courseClient
      .get('/course', { params: { course_id: courseId } })
      .then(response => {
        setCourseDetail(response.data);
        setErrorMessage('');
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error :', error);
        setErrorMessage('Failed to collect courseDetail.');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadCourse();
  }, []);

  return [courseDetail, errorMessage, isLoading];
};

export default useCourseDetail;
