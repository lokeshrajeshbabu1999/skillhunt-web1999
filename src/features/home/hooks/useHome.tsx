import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

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

  const fetchApi = () => {
    setIsLoading(true);
    courseClient
      .get('/home')
      .then(response => {
        console.log(response.data);
        setHomeContent(sortSection(response.data));
        setErrorMessage('');
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.log('Error :', error);
        setErrorMessage('Failed to collect courseDetail.');
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  const onDataRefresh = () => {
    setRefreshing(true);
    fetchApi();
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [homeContent, errorMessage, isLoading, refreshing, onDataRefresh];
};

export default useHome;
