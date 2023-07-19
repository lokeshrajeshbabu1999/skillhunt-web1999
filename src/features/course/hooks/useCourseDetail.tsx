/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useCourseDetail = (courseId: number) => {
  const [activeCourseDetail, setActiveCourseDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadCourse = () => {
    setIsLoading(true);
    courseClient
      .get('/course', { params: { course_id: courseId } })
      .then(response => {
        console.log('API Response Data:', response.data);
        setActiveCourseDetail(response.data);
        setErrorMessage('');
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setErrorMessage('Failed to collect courseDetail.');
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  const onDataRefresh = () => {
    setRefreshing(true);
    loadCourse();
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  return [
    activeCourseDetail,
    errorMessage,
    isLoading,
    refreshing,
    onDataRefresh,
  ];
};

export default useCourseDetail;
