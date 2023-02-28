import { USER_API_URL, API_USERNAME, API_PASSWORD } from '@env';
import axios from 'axios';
import { Buffer } from "buffer";

console.log('User API_URL', USER_API_URL);
const userClient = axios.create({
  baseURL: USER_API_URL.trim(),
});

userClient.interceptors.request.use(request => {

  // replace console with our logger of choice
  global.Buffer = Buffer;
  console.log('Request Base & Url : ', request.baseURL, request.url);
  const token = API_USERNAME + ':' + API_PASSWORD;
  const encodedToken = Buffer.from(token).toString('base64');
  // const header = `Authorization: Bearer ${token}`;
  request.headers.Authorization = 'Basic ' + encodedToken;
  console.log(request);
  return request;
});
// const headers = { Authorization: `Bearer ${token}` };
// return axios.get(URLConstants.USER_URL, { headers })

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
