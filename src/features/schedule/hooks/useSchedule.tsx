import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';
import shLogger from '../../../utils/Loggers';

const useSchedule = (userEmail: string, courseId: string) => {
  const [userSchedule, setUserSchedule] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadUserSchedule = () => {
    shLogger.debug('Load schedule for user ', userEmail);
    const params = { user: userEmail, course_id: courseId };

    userClient
      .get('/user-schedule', { params })
      .then(response => {
        shLogger.debug(
          'Course User %s schedule for %s',
          userEmail,
          courseId,
          response.data,
        );
        setUserSchedule(response.data);
        setRefreshing(false);
      })
      .catch(error => {
        shLogger.error('Error:', error);
        setRefreshing(false);
      });
  };
  const onDataRefresh = () => {
    setRefreshing(true);
    loadUserSchedule();
  };

  useEffect(() => {
    loadUserSchedule();
  }, []);

  return [userSchedule, refreshing, onDataRefresh];
};
export default useSchedule;
