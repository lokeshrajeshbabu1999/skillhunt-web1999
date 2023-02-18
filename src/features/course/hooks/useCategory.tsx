/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';

const useCategory = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sortCategory = categories => {
    return categories.sort((a, b) => {
      return a.order > b.order;
    });
  };

  const fetchApi = () => {
    setIsLoading(true);
    courseClient
      .get('/category')
      .then(response => {
        setCategory(sortCategory(response.data));
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
  }, []);

  return [category, errorMessage, isLoading];
};

export default useCategory;
