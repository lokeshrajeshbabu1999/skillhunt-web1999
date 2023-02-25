import axios from 'axios';
const USER_URL = 'https://8xhttajyc8.execute-api.ap-south-1.amazonaws.com/Prod';
const userApi = axios.create({
  baseURL: USER_URL.trim(),
});

export default userApi;
