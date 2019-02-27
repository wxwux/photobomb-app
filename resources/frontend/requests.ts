import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
const token = localStorage.getItem("token");

axios.defaults.baseURL = "/api";

if (token) {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (error.response!.status !== 401) {
//       return Promise.reject(error);
//     }

//     const originalRequest: AxiosRequestConfig = error.config;

//     return axios.post("/refreshToken").then((response: AxiosResponse) => {
//       const newToken: string = response.data.token;

//       localStorage.setItem("token", newToken);

//       axios.defaults.headers.Authorization = `Bearer ${newToken}`;
//       originalRequest.headers.Authorization = `Bearer ${newToken}`;

//       return axios(originalRequest);
//     });
//   }
// );

export default axios;
