import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';
import { ScheduleType } from '../../../types/ScheduleType';
import shLogger from '../../../utils/Loggers';

const useCourseSchedule = (courseId: string) => {
  const [courseSchedule, setCourseSchedule] = useState<ScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadSchedule = () => {
    courseClient
      .get('/schedule', { params: { course_id: courseId } })
      .then(response => {
        shLogger.info('Retrieved schedule for course ', courseId);
        setCourseSchedule(response.data);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        shLogger.error('Failed to collect course schedule:', error);
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
