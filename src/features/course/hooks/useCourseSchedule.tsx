/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';
import shLogger from '../../../utils/Loggers';

const useCourseSchedule = (courseId: string) => {
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadSchedule = () => {
    courseClient
      .get('/schedule', { params: { course_id: courseId } })
      .then(response => {
        shLogger.debug('Schedule for course %s', courseId, response.data);
        setCourseSchedule(response.data);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        shLogger.error('Error :', error);
        setIsLoading(false);
        setRefreshing(false);
      });
  };
  const onDataRefresh = () => {
    setRefreshing(true);
    loadSchedule();
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  return [courseSchedule, isLoading, refreshing, onDataRefresh];
};

export default useCourseSchedule;
