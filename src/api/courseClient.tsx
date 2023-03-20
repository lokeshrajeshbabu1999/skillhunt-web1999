import { COURSE_API_URL } from '@env';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import shLogger from '../utils/Loggers';

// console.log('Course API_URL', COURSE_API_URL);
const courseClient = axios.create({
  baseURL: COURSE_API_URL.trim(),
});

courseClient.interceptors.request.use(async request => {
  const currentSession = await Auth.currentSession();
  // console.log('User JWT Token', currentSession.getAccessToken().getJwtToken());
  request.headers.Authorization = currentSession.getAccessToken().getJwtToken();
  shLogger.debug(
    'Request Base & Url : ',
    request.baseURL,
    request.url,
    request.method,
    request.params,
  );
  return request;
});

courseClient.interceptors.response.use(
  response => {
    // console.log("Response : ", response);
    return response;
  },
  error => {
    console.log(error);
  },
);

export default courseClient;
