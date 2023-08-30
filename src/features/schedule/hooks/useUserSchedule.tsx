import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';
import shLogger from '../../../utils/Loggers';

const useUserSchedule = (userEmail: string) => {
  const [listSchedule, setUserSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const readUserSchedule = () => {
    shLogger.debug('Load schedule for user ', userEmail);
    const params = { user: userEmail, expand: true };
    setIsLoading(true);
    userClient
      .get('/user-schedule', { params })
      .then(response => {
        shLogger.debug('Schedule for User (%s) : %s', userEmail, response.data);
        setUserSchedule(response.data);
        updateMessageFlags('', false, false);
      })
      .catch(error => {
        shLogger.error('Error:', error);
        updateMessageFlags('Failed to collect user details', false, false);
      });
  };

  const onDataRefresh = () => {
    setRefreshing(true);
    readUserSchedule();
  };

  const updateMessageFlags = (
    prmErrorMessage: string,
    prmLoading: boolean,
    prmRefreshing: boolean,
  ) => {
    setErrorMessage(prmErrorMessage);
    setIsLoading(prmLoading);
    setRefreshing(prmRefreshing);
  };

  useEffect(() => {
    readUserSchedule();
  }, []);

  return [listSchedule, errorMessage, isLoading, refreshing, onDataRefresh];
};
export default useUserSchedule;
