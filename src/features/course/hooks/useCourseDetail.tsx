import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';
import shLogger from '../../../utils/Loggers';

const useCourseDetail = (courseId: string) => {
  const [activeCourseDetail, setActiveCourseDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadCourse = () => {
    setIsLoading(true);
    courseClient
      .get('/course', { params: { course_id: courseId } })
      .then(response => {
        shLogger.debug('API Response Data:', response.data);
        setActiveCourseDetail(response.data);
        setErrorMessage('');
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        shLogger.warn('API Error:', error);
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
