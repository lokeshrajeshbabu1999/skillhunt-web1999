import userApi from '../../../api/userClient';
import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';

const useSchedule = (userid: number) => {
  const [userSchedule, setUserSchedule] = useState([]);

  const loadUserSchedule = () => {
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
