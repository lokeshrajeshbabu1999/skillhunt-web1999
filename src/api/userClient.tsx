import { USER_API_URL } from '@env';
import axios from 'axios';

console.log('Course API_URL', USER_API_URL);
const userClient = axios.create({
  baseURL: USER_API_URL.trim(),
});

userClient.interceptors.request.use(request => {
  // replace console with our logger of choice
  console.log(
    'Request Base Url Params : ',
    request.baseURL,
    request.url,
    request.params,
  );
  // console.log(request);
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
