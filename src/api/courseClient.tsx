import { COURSE_API_URL } from '@env';
import axios from 'axios';

console.log('Course API_URL', COURSE_API_URL);
const courseClient = axios.create({
  baseURL: COURSE_API_URL.trim(),
});

courseClient.interceptors.request.use(request => {
  request.headers.Authorization = userAccessToken
  console.log(
    'Request Base & Url : ',
    request.baseURL,
    request.url,
    request.method,
    request.headers
  );
  console.log(request);
  return request;
});

// courseClient.interceptors.request.use(request => {
// replace console with our logger of choice
// console.log(
//   'Request Base & Url : ',
//   request.baseURL,
//   request.url,
//   request.method,
//   request.headers
// );
// console.log(request);
//   return request;
// });

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
