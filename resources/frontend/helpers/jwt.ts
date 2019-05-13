import { AxiosInstance } from "axios";

export const setTokenToStorage = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const setAuthHeaderToAxios = (axiosInstance: AxiosInstance, token: string) => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
};
