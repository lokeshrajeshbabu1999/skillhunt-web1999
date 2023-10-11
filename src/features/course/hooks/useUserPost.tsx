import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';
import shLogger from '../../../utils/Loggers';

const useUserPost = (url: string, inputData: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);

  const postData = async () => {
    setLoading(true);
    try {
      const response = await userClient.post(url, inputData);
      setData(response.data);
    } catch (error) {
      shLogger.error('usePost : error when making post call');
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  // userClient
  //   .post(
  //     '/user-api/user-schedule',
  //     JSON.stringify({
  //       user_id: user.attributes?.email,
  //       course_id: course.course_id,
  //       schedule_id: schedule.schedule_id,
  //     }),
  //   )
  //   .then(response => {
  //     shLogger.debug(response.data);
  //   })
  //   .catch(error => {
  //     shLogger.error('Error:', error);
  //   });

  useEffect(() => {
    postData();
  }, [url, data]);

  return {
    data,
    error,
    loading,
  };
};

export default useUserPost;
