import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useHome = () => {
  const [homeContent, setHomeContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setHomeContent(sortSection(response.data));
        console.log(response.data);
        setErrorMessage('');
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error :', error);
        setErrorMessage('Failed to collect courseDetail.');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [homeContent, errorMessage, isLoading];
};

export default useHome;
