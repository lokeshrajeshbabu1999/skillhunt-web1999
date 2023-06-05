/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useCourse = category => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const sortCourses = coursesParam => {
    return coursesParam.sort((a, b) => {
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
        setRefreshing(false);
      })
      .catch(error => {
        console.log('Error :', error);
        setErrorMessage('Failed to collect course list.');
        setIsLoading(false);
        setRefreshing(false);
      });
  };
  const onDataRefresh = () => {
    setRefreshing(true);
    loadCourses();
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return [courses, errorMessage, isLoading, refreshing, onDataRefresh];
};

export default useCourse;
