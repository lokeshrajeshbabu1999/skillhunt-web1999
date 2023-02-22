import axios from 'axios';

// const USER_URL = ' https://eicrv8w607.execute-api.ap-south-1.amazonaws.com/prod';
const userClient = axios.create({
  // baseURL: USER_URL.trim(),
  baseURL: 'https://eicrv8w607.execute-api.ap-south-1.amazonaws.com/prod',
});

userClient.interceptors.request.use(request => {
  // replace console with our logger of choice
  console.log('Request Base & Url : ', request.baseURL, request.url);
  console.log(request.data);
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
