import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';

const useSchedule = (userEmail: string) => {
  const [userSchedule, setUserSchedule] = useState([]);

  const loadUserSchedule = () => {
    console.log('Load schedule for user ', userEmail);
    userClient
      .get('/user-schedule')
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
