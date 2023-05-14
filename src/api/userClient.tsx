import { Auth } from 'aws-amplify';
import axios from 'axios';
import Config from 'react-native-config';
import shLogger from '../utils/Loggers';
// console.log('User API_URL', USER_API_URL);

const userClient = axios.create({
  baseURL: Config.USER_API_URL,
});

userClient.interceptors.request.use(async request => {
  const currentSession = await Auth.currentSession();
  // console.log('User JWT Token', currentSession.getIdToken().getJwtToken());
  request.headers.Authorization = currentSession.getIdToken().getJwtToken();
  shLogger.debug(
    'Request Base & Url : ',
    request.baseURL,
    request.url,
    request.method,
    request.params,
  );
  return request;
});

userClient.interceptors.response.use(
  response => {
    // console.log('Response : ', response.data);
    return response;
  },
  error => {
    console.log('Error:', error);
  },
);
export default userClient;
