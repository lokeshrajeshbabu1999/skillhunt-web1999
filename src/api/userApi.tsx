import axios from "axios";

// const USER_URL = ' https://eicrv8w607.execute-api.ap-south-1.amazonaws.com/prod';
const userApi = axios.create({
    // baseURL: USER_URL.trim(),
    baseURL: "https://eicrv8w607.execute-api.ap-south-1.amazonaws.com/prod",
});

export default userApi;