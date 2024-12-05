import axios from "axios";

const axiosCourse = axios.create({
  baseURL: "/course-api",
});

// axiosCourse.interceptors.request.use(
//   async (request) => {
//     try {
//       const identityId = await getIdentityToken();

//       request.headers.Authorization = `Bearer ${identityId}`;
//       return request;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosCourse;
