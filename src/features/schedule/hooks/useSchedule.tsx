import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';

const useSchedule = (userEmail: string, courseId: string) => {
  const [userSchedule, setUserSchedule] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

  const loadUserSchedule = () => {
    console.log('Load schedule for user ', userEmail);
    const params = { user: userEmail, course_id: courseId };

    userClient
      .get('/user-schedule', { params })
      .then(response => {
        console.log(
          'Course User %s schedule for %s',
          userEmail,
          courseId,
          response.data,
        );
        setUserSchedule(response.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log('Error:', error);
        setRefreshing(false);
      });
  };
  const onDataRefresh = () => {
      setRefreshing(true);
      fetchApi();
    };

  useEffect(() => {
    loadUserSchedule();
  }, []);

  return [userSchedule, refreshing, onDataRefresh];
};
export default useSchedule;
