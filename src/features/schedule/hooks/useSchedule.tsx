import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';

const useSchedule = (userEmail: string, courseId: string) => {
  const [userSchedule, setUserSchedule] = useState([]);

  const loadUserSchedule = () => {
    console.log('Load schedule for user ', userEmail);
    const params = { userEMail: userEmail, course_id: courseId };

    userClient
      .get('/user-schedule', { params })
      .then(response => {
        setUserSchedule(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    loadUserSchedule();
  }, []);

  return [userSchedule];
};
export default useSchedule;
