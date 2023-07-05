/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';
import shLogger from '../../../utils/Loggers';

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
        console.log('Response data : ', response.data);
        setActiveCourseDetail(response.data);
        setErrorMessage('');
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        shLogger.error('Error :', error);
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
  }, []);

  return [
    activeCourseDetail,
    errorMessage,
    isLoading,
    refreshing,
    onDataRefresh,
  ];
};

export default useCourseDetail;
