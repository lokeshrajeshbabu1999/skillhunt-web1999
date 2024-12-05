import axios from "axios";

const axiosUser = axios.create({
    baseURL: "/user-api",
});

export default axiosUser;
