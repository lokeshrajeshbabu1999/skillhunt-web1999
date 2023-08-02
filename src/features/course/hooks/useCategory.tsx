import { useEffect, useState } from 'react';
import courseClient from '../../../api/courseClient';
import { Category } from '../../../types/CategoryType';
import shLogger from '../../../utils/Loggers';

const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sortCategory = (categories: Category[]) => {
    return categories.sort((a, b) => {
      return a.order - b.order;
    });
  };

  const fetchApi = () => {
    setIsLoading(true);
    courseClient
      .get('/category')
      .then(response => {
        setCategory(sortCategory(response.data));
        shLogger.debug(response.data);
        setErrorMessage('');
        setIsLoading(false);
      })

      .catch(error => {
        shLogger.error('Error :', error);
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
