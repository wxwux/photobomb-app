import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { setAuthHeaderToAxios, setTokenToStorage } from "./helpers/jwt";

const token = localStorage.getItem("token");

const requests: AxiosInstance = axios.create({
  baseURL: "/api",
  headers : {
    Authorization : `Bearer ${token}`
  }
})

requests.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response!.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest: AxiosRequestConfig = error.config;

    originalRequest.baseURL = '';

    console.log(originalRequest);
    
    return requests.post("/refreshToken").then((response: AxiosResponse) => {
      const newToken: string = response.data.token;

      setTokenToStorage(newToken);
      setAuthHeaderToAxios(requests, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return axios(originalRequest);
    });
  }
);

export default requests;
