import axios from 'axios';
// import { API_URL } from '@env';
// import { Buffer } from 'buffer';

const API_URL = 'https://kcs3mbhdtf.execute-api.ap-south-1.amazonaws.com/Prod';
const courseClient = axios.create({
  baseURL: API_URL.trim(),
});

courseClient.interceptors.request.use(request => {
  // replace console with our logger of choice
  // global.Buffer = Buffer;
  // console.log('Request Base & Url : ', request.baseURL, request.url);
  // const token = API_USERNAME + ':' + API_PASSWORD;
  // const encodedToken = Buffer.from(token).toString('base64');
  // request.headers.Authorization = 'Basic ' + encodedToken;
  // console.log(request);
  return request;
});

courseClient.interceptors.request.use(request => {
  // replace console with our logger of choice
  console.log('Request Base & Url : ', request.baseURL, request.url);
  // console.log(request);
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
