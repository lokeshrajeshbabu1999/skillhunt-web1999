import { Auth } from 'aws-amplify';
import axios from 'axios';
import Config from 'react-native-config';
import shLogger from '../utils/Loggers';

const courseClient = axios.create({
  baseURL: Config.COURSE_API_URL,
});

courseClient.interceptors.request.use(async request => {
  const currentSession = await Auth.currentSession();
  request.headers.Authorization =
    'Bearer ' + currentSession.getIdToken().getJwtToken();
  shLogger.debug('Auth Token', request.headers.Authorization);
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
    shLogger.error(error);
  },
);

export default courseClient;
