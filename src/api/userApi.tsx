import axios from "axios";

// const USER_URL = ' https://eicrv8w607.execute-api.ap-south-1.amazonaws.com/prod';
const userApi = axios.create({
    // baseURL: USER_URL.trim(),
    baseURL: "https://eicrv8w607.execute-api.ap-south-1.amazonaws.com/prod",
});

userApi.interceptors.request.use(request => {
    // replace console with our logger of choice
    console.log('Request Base & Url : ', request.baseURL, request.url);
    // console.log(request);
    return request;
});
export default userApi;