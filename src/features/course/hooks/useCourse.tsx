/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useCourse = category => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sortCourses = courses => {
    return courses.sort((a, b) => {
      return a.order > b.order;
    });
  };

  const loadCourses = () => {
    setIsLoading(true);
    courseClient
      .get('/course', { params: { ctgry: category } })
      .then(response => {
        setCourses(sortCourses(response.data));
        console.log(response.data);
        setErrorMessage('');
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error :', error);
        setErrorMessage('Failed to collect course list.');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return [courses, errorMessage, isLoading];
};

export default useCourse;
