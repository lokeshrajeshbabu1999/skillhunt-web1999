import { USER_API_URL } from '@env';
import { Auth } from 'aws-amplify';
import axios from 'axios';

console.log('User API_URL', USER_API_URL);
const userClient = axios.create({
  baseURL: USER_API_URL.trim(),
});

userClient.interceptors.request.use(async request => {
  const currentSession = await Auth.currentSession();
  // console.log('User JWT Token', currentSession.getAccessToken().getJwtToken());
  request.headers.Authorization = currentSession.getAccessToken().getJwtToken();
  console.log(
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
