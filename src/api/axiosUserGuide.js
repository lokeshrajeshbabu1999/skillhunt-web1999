import axios from "axios";

const axiosUserGuide = axios.create({
  baseURL: "/guide-api",
});

export default axiosUserGuide;
