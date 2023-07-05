import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';
import shLogger from '../../../utils/Loggers';

const useHome = () => {
  const [homeContent, setHomeContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const sortSection = (sections: any) => {
    return sections.sort((a: { order: number }, b: { order: number }) => {
      return a.order < b.order;
    });
  };

  const loadHomeContent = () => {
    setIsLoading(true);
    courseClient
      .get('/home')
      .then(response => {
        setHomeContent(sortSection(response.data));
        setErrorMessage('');
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        shLogger.error('Error :', error);
        setErrorMessage('Failed to collect courseDetail.');
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  const onDataRefresh = () => {
    setRefreshing(true);
    loadHomeContent();
  };

  useEffect(() => {
    loadHomeContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [homeContent, errorMessage, isLoading, refreshing, onDataRefresh];
};

export default useHome;
