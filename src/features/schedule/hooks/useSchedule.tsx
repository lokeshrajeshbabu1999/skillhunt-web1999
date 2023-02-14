import userApi from '../../../api/userApi';
import { useEffect, useState } from 'react';

const useSchedule = (userid: number) => {
  const [userSchedule, setUserSchedule] = useState([]);

  const loadUserSchedule = () => {
    userApi
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
